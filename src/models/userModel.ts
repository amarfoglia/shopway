import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import IUser from './user';

const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: [true, 'Please tell us your name!'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  photo: String,
  role: {
    type: String,
    enum: ['customer', 'seller', 'admin'],
    default: 'customer',
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
    validate: { // trigger on save and create
      validator(this: IUser, p: String): boolean {
        return p === this.password;
      },
      message: 'Passwords are not the same!',
    },
  },
  passwordChangedAt: Date,
});

userSchema.pre<IUser>('save', async function hashPassword(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = '';
  }
  next();
});

userSchema.methods.passwordMatch = async (candidatePassword: string, userPassword: string) => (
  bcrypt.compare(candidatePassword, userPassword)
);

userSchema.methods.changedPasswordAfter = function _(this: IUser, JWTTimestamp: number) {
  if (this?.passwordChangedAt) {
    const changedTimestamp = this.passwordChangedAt.valueOf() / 1000;
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

export default mongoose.model<IUser>('User', userSchema);
