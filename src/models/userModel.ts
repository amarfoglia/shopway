/* eslint-disable no-unused-vars */
import mongoose, { Document, PopulatedDoc } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { ObjectId } from 'mongodb';
import User, { SellerAccount, CustomerAccount } from './user';
import { getDateFromNow, ONE_SEC_IN_MS } from '../utils/time';
import SellerModel from './sellerModel';
import CustomerModel from './customerModel';

interface UserDoc extends Document, User {
  passwordMatch(
    candidatePassword: string,
    userPassword: string
  ): Promise<boolean>;
  changedPasswordAfter(JWTTimestamp: number): boolean;
  createPasswordResetToken(): string;
  seller?: [PopulatedDoc<SellerAccount & Document>];
  customer?: PopulatedDoc<CustomerAccount & Document>;
}

interface IUserModel extends mongoose.Model<UserDoc> {}

const userSchema = new mongoose.Schema<UserDoc>({
  firstname: {
    type: String,
    required: [true, 'Please tell us your firstname!'],
  },
  lastname: {
    type: String,
    required: [true, 'Please tell us your lastname'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  photo: {
    type: String,
    default: 'default.jpg',
  },
  role: {
    type: String,
    enum: ['customer', 'seller', 'admin'],
    required: [true, 'please provide a valid role'],
    default: 'customer',
  },
  seller: {
    type: [ObjectId],
    ref: 'Seller',
  },
  customer: {
    type: ObjectId,
    ref: 'Customer',
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false, // for security purpose
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
      message: 'Passwords are not the same!',
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

userSchema.pre<UserDoc>('save', async function setRole() {
  switch (this.role) {
    case 'customer':
      this.customer = (await CustomerModel.create({ userId: this.id })).id;
      break;
    case 'seller':
      this.seller?.push((await SellerModel.create({ userId: this.id })).id);
      break;
    default:
  }
});

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

userSchema.pre<UserDoc>(/^find/, function _(next) {
  const paramsToExclude = '-userId -__v';
  this.populate([
    { path: 'seller', select: paramsToExclude },
    { path: 'customer', select: paramsToExclude }
  ]);
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

export { UserDoc, IUserModel };

export default <IUserModel>mongoose.model<UserDoc>('User', userSchema);
