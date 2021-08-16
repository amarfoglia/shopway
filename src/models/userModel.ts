import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import User from './user';

const UserSchema = new mongoose.Schema<User>({
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
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: { // trigger on save and create
      validator(this: User, p: String): boolean {
        return p === this.password;
      },
      message: 'Passwords are not the same!',
    },
  },
});

UserSchema.pre<User>('save', async function hashPassword(next): Promise<void> {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = '';
  }
  return next();
});

export default mongoose.model<User>('User', UserSchema);
