/* eslint-disable no-unused-vars */
import mongoose, { Document } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import User from './user';
import { getDateFromNow, ONE_SEC_IN_MS } from '../../utils/time';
import Role from '../role';

const options = { discriminatorKey: 'role' };

interface UserDoc extends Document, User {
  passwordMatch(
    candidatePassword: string,
    userPassword: string
  ): Promise<boolean>;
  changedPasswordAfter(JWTTimestamp: number): boolean;
  createPasswordResetToken(): string;
}

interface IUserModel extends mongoose.Model<UserDoc> {}

const userSchema = new mongoose.Schema<UserDoc>({
  fullName: {
    type: String,
    required: [true, 'Please tell us your name!']
  },
  role: {
    type: String,
    value: Role,
    required: [true, 'Please provide a valid role']
  },
  photo: {
    type: String
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false // for security purpose
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    select: false,
    validate: {
      // trigger on save and create
      validator(this: UserDoc, p: String): boolean {
        return p === this.password;
      },
      message: 'Passwords are not the same!'
    }
  },
  createdAt: {
    type: Date,
    default: new Date(Date.now())
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false
  }
}, options);

userSchema.pre<UserDoc>('save', async function hashPassword(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
  }
  next();
});

userSchema.pre<UserDoc>('save', function _(next) {
  if (this.isModified('password') && !this.isNew) {
    this.passwordChangedAt = new Date(Date.now() - ONE_SEC_IN_MS);
  }
  next();
});

userSchema.pre<IUserModel>(/^find/, function _(next) {
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.passwordMatch = async (
  candidatePassword: string,
  userPassword: string
) => bcrypt.compare(candidatePassword, userPassword);

userSchema.methods.changedPasswordAfter = function _(
  this: UserDoc,
  JWTTimestamp: number
) {
  if (this?.passwordChangedAt) {
    const changedTimestamp = this.passwordChangedAt.valueOf() / ONE_SEC_IN_MS;
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

userSchema.methods.createPasswordResetToken = function _() {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires = getDateFromNow(
    parseInt(process.env.RESET_TOKEN_EXPIRES || '1', 10)
  );
  return resetToken;
};

export { UserDoc, IUserModel, options };

export default <IUserModel>mongoose.model<UserDoc>('User', userSchema);
