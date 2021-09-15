import * as Yup from 'yup';
import 'yup-phone';
import { SignupFormModel, SellerFormModel, CustomerFormModel } from '.';
import { Roles } from '../User';

const {
  formField: { email, password, fullName, passwordConfirm, role },
} = SignupFormModel;

const {
  formField: { storeName, address, city, phone, logo },
} = SellerFormModel;

const {
  formField: { photo },
} = CustomerFormModel;

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
  Yup.object().shape({
    [photo.name]: Yup.mixed(),
  }),
  Yup.object().shape({
    [storeName.name]: Yup.string().required(`${storeName.requiredErrorMsg}`),
    [logo.name]: Yup.mixed(),
    [city.name]: Yup.string().required(`${city.requiredErrorMsg}`),
    [phone.name]: Yup.string().phone('+39').required(`${phone.requiredErrorMsg}`),
    [address.name]: Yup.string().required(`${address.requiredErrorMsg}`),
  }),
];

const loginValidation = Yup.object().shape({
  [email.name]: Yup.string().email().required(`${email.requiredErrorMsg}`),
  [password.name]: Yup.string().required(`${password.requiredErrorMsg}`),
});

const editProfileValidation = Yup.object().shape({
  [email.name]: Yup.string().email().required(`${email.requiredErrorMsg}`),
  [fullName.name]: Yup.string().required(`${fullName.requiredErrorMsg}`),
});

const forgotPasswordValidation = Yup.object().shape({
  [email.name]: Yup.string().email().required(`${email.requiredErrorMsg}`),
});

export { signupValidation, loginValidation, forgotPasswordValidation, editProfileValidation };
