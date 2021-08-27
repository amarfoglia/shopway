import { Field } from 'formik';
import * as React from 'react';
import { InputField } from '../../../components/formFields';
import { LoginFormModel } from '../../../model/auth';

interface Props {
  formField: typeof LoginFormModel.formField;
}

const LoginForm: React.FC<Props> = ({ formField: { email, password } }) => {
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
    </React.Fragment>
  );
};

export default LoginForm;
