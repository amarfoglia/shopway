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
