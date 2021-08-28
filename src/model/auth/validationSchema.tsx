import * as Yup from 'yup';
import { SignupFormModel, SellerFormModel, CustomerFormModel } from '.';
import { Roles } from '../User';

const {
  formField: { email, password, confirmPassword, role },
} = SignupFormModel;

const {
  formField: { store, address, city },
} = SellerFormModel;

const {
  formField: { firstname, lastname, phone },
} = CustomerFormModel;

const signupValidation = [
  Yup.object().shape({
    [email.name]: Yup.string().email().required(`${email.requiredErrorMsg}`),
    [password.name]: Yup.string().required(`${password.requiredErrorMsg}`),
    [confirmPassword.name]: Yup.string().test(
      'password-match',
      `${confirmPassword.invalidErrorMsg}`,
      function _(val) {
        return this.parent.password === val;
      },
    ),
  }),
  Yup.object().shape({
    [role.name]: Yup.string()
      .oneOf([Roles.CUSTOMER.value, Roles.SELLER.value])
      .required(`${role.requiredErrorMsg}`),
  }),
  Yup.object().shape({
    [firstname.name]: Yup.string().required(`${firstname.requiredErrorMsg}`),
    [lastname.name]: Yup.string().required(`${lastname.requiredErrorMsg}`),
    [phone.name]: Yup.number().required(`${phone.requiredErrorMsg}`),
  }),
  Yup.object().shape({
    [store.name]: Yup.string().required(`${store.requiredErrorMsg}`),
    [address.name]: Yup.string().required(`${address.requiredErrorMsg}`),
    [city.name]: Yup.string().required(`${city.requiredErrorMsg}`),
  }),
];

const loginValidation = Yup.object().shape({
  [email.name]: Yup.string().email().required(`${email.requiredErrorMsg}`),
  [password.name]: Yup.string().required(`${password.requiredErrorMsg}`),
});

export { signupValidation, loginValidation };
