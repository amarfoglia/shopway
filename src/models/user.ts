import Role from './role';

/* eslint-disable no-unused-vars */
interface User {
  id?: any;
  firstname: string;
  lastname: string;
  fullname: string;
  role: Role;
  email: string;
  photo: string;
  active: boolean;
  password: string;
  passwordConfirm?: string;
  passwordChangedAt: Date;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
}

export default User;
