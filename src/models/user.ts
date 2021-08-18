/* eslint-disable no-unused-vars */
import { Document } from 'mongoose';

interface IUser extends Document {
  name: string,
  email: string,
  photo: string,
  role: string,
  password: string,
  passwordConfirm?: string,
  passwordChangedAt: Date,
  passwordResetToken?: string,
  passwordResetExpires?: Date,
  passwordMatch(candidatePassword: string, userPassword: string): Promise<boolean>,
  changedPasswordAfter(JWTTimestamp: number): boolean,
  createPasswordResetToken(): string,
}

export default IUser;
