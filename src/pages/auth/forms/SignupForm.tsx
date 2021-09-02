import * as React from 'react';
import { Grid } from '@material-ui/core';
import CheckOutlined from '@material-ui/icons/CheckOutlined';
import LockOutlined from '@material-ui/icons/LockOutlined';
import MailOutlineOutlined from '@material-ui/icons/MailOutlineOutlined';
import PermIdentityOutlined from '@material-ui/icons/PermIdentityOutlined';

import { Field } from 'formik';
import { InputField } from '../../../components/formFields';
import { SignupFormModel } from '../../../model/auth';

interface Props {
  formField: typeof SignupFormModel.formField;
}

const SignupForm: React.FC<Props> = ({
  formField: { email, fullName, password, passwordConfirm },
}) => {
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
          name={fullName.name}
          placeholder={fullName.label}
          aria-label={fullName.label}
          Icon={PermIdentityOutlined}
          autoComplete={fullName.name}
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
          name={passwordConfirm.name}
          placeholder={passwordConfirm.label}
          aria-label={passwordConfirm.label}
          Icon={CheckOutlined}
          autoComplete={passwordConfirm.name}
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
