const commonFields = {
  email: {
    name: 'user.email',
    label: 'Email',
    requiredErrorMsg: 'Email is required',
    invalidErrorMsg: 'Email is invalid',
  },
  fullName: {
    name: 'user.fullName',
    label: 'FullName',
    requiredErrorMsg: 'FullName is required',
  },
  password: {
    name: 'user.password',
    label: 'Password',
    requiredErrorMsg: 'Password is required',
    invalidErrorMsg: 'Password is invalid',
  },
};

const { email, fullName, password } = commonFields;

const LoginFormModel = {
  formId: 'loginForm',
  formField: {
    email,
    password,
  },
};

const SignupFormModel = {
  formId: 'signupForm',
  formField: {
    email,
    fullName,
    password,
    passwordConfirm: {
      name: 'user.passwordConfirm',
      label: 'Confirm password',
      invalidErrorMsg: 'Passwords must match',
    },
    role: {
      name: 'user.role',
      label: 'Role',
      requiredErrorMsg: 'Role is required',
    },
  },
};

export { SignupFormModel, LoginFormModel };
