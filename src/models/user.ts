/* eslint-disable no-unused-vars */
interface User {
  id?: any;
  customer?: CustomerAccount,
  seller?: [SellerAccount],
  firstname: string,
  lastname: string,
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

interface CustomerAccount {
  id?: any,
  userId: any,
  followerList: [any]
}

interface SellerAccount {
  id?: any,
  userId: any,
  storeList: [any],
  details: string
}

export { CustomerAccount, SellerAccount };

export default User;
