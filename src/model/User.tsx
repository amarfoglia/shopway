export default interface User {
  id?: string;
  fullName: string;
  role: string;
  email: string;
  password?: string;
  passwordConfirm?: string;
  passwordChangedAt?: Date;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
}

const Roles = {
  CUSTOMER: {
    value: 'Customer',
    label: 'Customer',
    index: 0,
  },
  SELLER: {
    value: 'Seller',
    label: 'Seller',
    index: 1,
  },
};

export { Roles };
