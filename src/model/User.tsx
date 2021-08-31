export default interface User {
  id?: string;
  fullName: string;
  role: string;
  email: string;
  photo?: string;
  password?: string;
  passwordConfirm?: string;
  passwordChangedAt?: Date;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
}

const Roles = {
  CUSTOMER: {
    value: 'customer',
    label: 'Customer',
    index: 0,
  },
  SELLER: {
    value: 'seller',
    label: 'Seller',
    index: 1,
  },
};

export { Roles };
