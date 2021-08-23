/* eslint-disable no-unused-vars */
interface User {
  id?: any;
  name: string,
  email: string,
  photo: string,
  role: string,
  active: boolean,
  password: string,
  passwordConfirm?: string,
  passwordChangedAt: Date,
  passwordResetToken?: string,
  passwordResetExpires?: Date
}

export default User;
