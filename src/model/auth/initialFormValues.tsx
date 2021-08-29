import { Roles } from '../User';
import { CustomerFormModel, SellerFormModel, SignupFormModel } from './';

const { formField: userFormField } = SignupFormModel;
const { formField: sellerFormField } = SellerFormModel;
const { formField: customerFormField } = CustomerFormModel;

const { email, password, confirmPassword, role } = userFormField;
const { firstname, lastname, phone } = customerFormField;
const { store, address, city } = sellerFormField;
const { CUSTOMER } = Roles;

const initialValues = {
  [email.name]: '',
  [password.name]: '',
  [confirmPassword.name]: '',
  [role.name]: CUSTOMER.value,
  [firstname.name]: '',
  [lastname.name]: '',
  [phone.name]: '',
  [store.name]: '',
  [address.name]: '',
  [city.name]: '',
};

export default initialValues;
