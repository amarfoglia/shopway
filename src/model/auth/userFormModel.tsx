const commonFields = {
  email: {
    name: 'email',
    label: 'Email',
    requiredErrorMsg: 'Email is required',
    invalidErrorMsg: 'Email is invalid',
  },
  password: {
    name: 'password',
    label: 'Password',
    requiredErrorMsg: 'Password is required',
    invalidErrorMsg: 'Password is invalid',
  },
};

const { email, password } = commonFields;

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
    password,
    confirmPassword: {
      name: 'confirmPassword',
      label: 'Confirm password',
      invalidErrorMsg: 'Passwords must match',
    },
    role: {
      name: 'role',
      label: 'Role',
      requiredErrorMsg: 'Role is required',
    },
  },
};

export { SignupFormModel, LoginFormModel };
