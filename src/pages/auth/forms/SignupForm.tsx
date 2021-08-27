import { Field } from 'formik';
import * as React from 'react';
import { InputField } from '../../../components/formFields';
import { SignupFormModel } from '../../../model/auth';

interface Props {
  formField: typeof SignupFormModel.formField;
}

const SignupForm: React.FC<Props> = ({ formField: { email, password, confirmPassword } }) => {
  return (
    <React.Fragment>
      <Field
        name={email.name}
        label={email.label}
        autoComplete={email.name}
        component={InputField}
      />
      <Field
        name={password.name}
        label={password.label}
        autoComplete={password.name}
        component={InputField}
        type="password"
      />
      <Field
        name={confirmPassword.name}
        label={confirmPassword.label}
        autoComplete={confirmPassword.name}
        component={InputField}
        type="password"
      />
    </React.Fragment>
  );
};

export default SignupForm;
