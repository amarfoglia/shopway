import * as Yup from 'yup';
import 'yup-phone';
import { SignupFormModel, SellerFormModel } from '.';
import { Roles } from '../User';

const {
  formField: { email, password, fullName, passwordConfirm, role },
} = SignupFormModel;

const {
  formField: { storeName, address, city, phone },
} = SellerFormModel;

const signupValidation = [
  Yup.object().shape({
    [email.name]: Yup.string().email().required(`${email.requiredErrorMsg}`),
    [fullName.name]: Yup.string().required(`${fullName.requiredErrorMsg}`),
    [password.name]: Yup.string().required(`${password.requiredErrorMsg}`),
    [passwordConfirm.name]: Yup.string().test(
      'password-match',
      `${passwordConfirm.invalidErrorMsg}`,
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
  Yup.object().shape({}),
  Yup.object().shape({
    [storeName.name]: Yup.string().required(`${storeName.requiredErrorMsg}`),
    [city.name]: Yup.string().required(`${city.requiredErrorMsg}`),
    [phone.name]: Yup.string().phone().required(`${phone.requiredErrorMsg}`),
    [address.name]: Yup.string().required(`${address.requiredErrorMsg}`),
  }),
];

const loginValidation = Yup.object().shape({
  [email.name]: Yup.string().email().required(`${email.requiredErrorMsg}`),
  [password.name]: Yup.string().required(`${password.requiredErrorMsg}`),
});

export { signupValidation, loginValidation };
