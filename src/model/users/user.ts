interface User {
  id?: string;
  fullName: string;
  role: string;
  email: string;
  photo?: string | File;
  password: string;
  passwordConfirm?: string;
  passwordChangedAt?: Date;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
}

export default User;
