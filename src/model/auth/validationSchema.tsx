import * as Yup from 'yup';
import 'yup-phone';
import Role from '../users/role';
import { SignupFormModel, SellerFormModel } from '.';

const {
  formField: { email, password, fullName, passwordConfirm, role },
} = SignupFormModel;

const {
  formField: { name, address, city, phone },
} = SellerFormModel;

const signupValidation = [
  Yup.object().shape({
    user: Yup.object().shape({
      email: Yup.string().email().required(`${email.requiredErrorMsg}`),
      fullName: Yup.string().required(`${fullName.requiredErrorMsg}`),
      password: Yup.string().required(`${password.requiredErrorMsg}`),
      passwordConfirm: Yup.string().test(
        'password-match',
        `${passwordConfirm.invalidErrorMsg}`,
        function _(val) {
          return this.parent.password === val;
        },
      ),
    }),
  }),
  Yup.object().shape({
    user: Yup.object().shape({
      role: Yup.string().oneOf([Role.CUSTOMER, Role.SELLER]).required(`${role.requiredErrorMsg}`),
    }),
  }),
  Yup.object().shape({
    user: Yup.object().shape({
      photo: Yup.mixed(),
    }),
  }),
  Yup.object().shape({
    store: Yup.object().shape({
      name: Yup.string().required(`${name.requiredErrorMsg}`),
      logo: Yup.mixed(),
      city: Yup.string().required(`${city.requiredErrorMsg}`),
      phone: Yup.string().phone('+39').required(`${phone.requiredErrorMsg}`),
      address: Yup.string().required(`${address.requiredErrorMsg}`),
    }),
  }),
];

const loginValidation = Yup.object().shape({
  user: Yup.object().shape({
    email: Yup.string().email().required(`${email.requiredErrorMsg}`),
    password: Yup.string().min(8).required(`${password.requiredErrorMsg}`),
  }),
});

const editProfileValidation = Yup.object().shape({
  email: Yup.string().email().required(`${email.requiredErrorMsg}`),
  fullName: Yup.string().required(`${fullName.requiredErrorMsg}`),
  photo: Yup.mixed(),
});

const changePasswordValidation = Yup.object().shape({
  fields: Yup.object().shape({
    passwordCurrent: Yup.string().min(8).required(`${password.requiredErrorMsg}`),
    password: Yup.string().min(8).required(`${password.requiredErrorMsg}`),
    passwordConfirm: Yup.string().test(
      'password-match',
      `${passwordConfirm.invalidErrorMsg}`,
      function _(val) {
        return this.parent.password === val;
      },
    ),
  }),
});

const forgotPasswordValidation = Yup.object().shape({
  email: Yup.string().email().required(`${email.requiredErrorMsg}`),
});

export {
  signupValidation,
  loginValidation,
  forgotPasswordValidation,
  editProfileValidation,
  changePasswordValidation,
};
