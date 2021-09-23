import Seller from './seller';

interface User {
  _id?: string;
  fullName: string;
  role: string;
  email: string;
  createdAt: Date;
  photo?: string | File;
  password: string;
  passwordConfirm?: string;
  passwordChangedAt?: Date;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
}

const getStoreId = (user?: User): string | undefined => user && (user as Seller).stores?.[0];

export { getStoreId };

export default User;
