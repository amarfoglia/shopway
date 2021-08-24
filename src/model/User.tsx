export default interface User {
  id?: string;
  name: string;
  email: string;
  photo?: string;
  role: string;
  password?: string;
  passwordConfirm?: string;
  passwordChangedAt?: Date;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
}
