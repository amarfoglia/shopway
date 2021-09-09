import { ObjectId } from 'mongodb';

/* eslint-disable no-unused-vars */
interface User {
  id?: any;
  fullName: string;
  role: string;
  email: string;
  active?: boolean;
  password: string;
  passwordConfirm?: string;
  passwordChangedAt?: Date;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
}

export default User;
