import { Grid } from '@material-ui/core';
import { CheckOutlined, LockOutlined, MailOutlineOutlined } from '@material-ui/icons';
import { Field } from 'formik';
import * as React from 'react';
import { InputField } from '../../../components/formFields';
import { SignupFormModel } from '../../../model/auth';

interface Props {
  formField: typeof SignupFormModel.formField;
}

const SignupForm: React.FC<Props> = ({ formField: { email, password, confirmPassword } }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Field
          name={email.name}
          placeholder={email.label}
          aria-label={email.label}
          Icon={MailOutlineOutlined}
          autoComplete={email.name}
          variant="outlined"
          component={InputField}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <Field
          name={password.name}
          placeholder={password.label}
          aria-label={password.label}
          Icon={LockOutlined}
          autoComplete={password.name}
          variant="outlined"
          type="password"
          component={InputField}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <Field
          name={confirmPassword.name}
          placeholder={confirmPassword.label}
          aria-label={confirmPassword.label}
          Icon={CheckOutlined}
          autoComplete={confirmPassword.name}
          variant="outlined"
          type="password"
          component={InputField}
          fullWidth
        />
      </Grid>
    </Grid>
  );
};

export default SignupForm;
