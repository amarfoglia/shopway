import * as Yup from 'yup';
import { SignupFormModel, SellerFormModel } from '.';

const {
  formField: { email, password, confirmPassword },
} = SignupFormModel;

const {
  formField: { store, address, city },
} = SellerFormModel;

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
