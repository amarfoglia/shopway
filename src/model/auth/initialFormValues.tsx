import { Roles } from '../User';
import { CustomerFormModel, SellerFormModel, SignupFormModel } from './';

const { formField: userFormField } = SignupFormModel;
const { formField: sellerFormField } = SellerFormModel;
const { formField: customerFormField } = CustomerFormModel;

const { email, password, passwordConfirm, role, fullName } = userFormField;
const { photo } = customerFormField;
const { storeName, address, city, phone, logo } = sellerFormField;
const { CUSTOMER } = Roles;

const initialValues = {
  [email.name]: '',
  [password.name]: '',
  [fullName.name]: '',
  [passwordConfirm.name]: '',
  [role.name]: CUSTOMER.value,
  [photo.name]: '',
  [logo.name]: '',
  [phone.name]: '(+39)-',
  [storeName.name]: '',
  [address.name]: '',
  [city.name]: '',
};

export default initialValues;
