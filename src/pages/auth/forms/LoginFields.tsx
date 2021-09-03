import { Grid, Typography } from '@material-ui/core';
import MailOutlineOutlined from '@material-ui/icons/MailOutlineOutlined';
import LockOutlined from '@material-ui/icons/LockOutlined';
import { Field } from 'formik';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { InputField } from '../../../components/formFields';
import { LoginFormModel } from '../../../model/auth';
import PATHS from '../../../utils/routes';
import baseStyles from '../../../style/styles';

interface Props {
  formField: typeof LoginFormModel.formField;
}

const LoginFields: React.FC<Props> = ({ formField: { email, password } }) => {
  const classes = baseStyles();
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
        <Typography variant="body2" align="right">
          <Link to={PATHS.FORGOT_PASSWORD} className={classes.link}>
            Forgot password?
          </Link>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default LoginFields;
