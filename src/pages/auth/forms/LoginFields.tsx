import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import MailOutlineOutlined from '@material-ui/icons/MailOutlineOutlined';
import LockOutlined from '@material-ui/icons/LockOutlined';
import { Field } from 'formik';
import { Link } from 'react-router-dom';
import { LoginFormModel } from '../../../model/auth';
import PATHS from '../../../utils/routes';
import baseStyles from '../../../style/styles';
import DebouncedInput from '../../../components/formFields/DebouncedInput';

interface Props {
  formField: typeof LoginFormModel.formField;
  onChange: (e: React.ChangeEvent<string>) => void;
}

const LoginFields: React.FC<Props> = ({ formField: { email, password }, onChange }) => {
  const classes = baseStyles();
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Field
          key={email.name}
          name={email.name}
          placeholder={email.label}
          aria-label={email.label}
          Icon={MailOutlineOutlined}
          autoComplete={email.name}
          variant="outlined"
          onChange={onChange}
          fullWidth
          component={DebouncedInput}
        />
      </Grid>
      <Grid item xs={12}>
        <Field
          key={password.name}
          name={password.name}
          placeholder={password.label}
          aria-label={password.label}
          Icon={LockOutlined}
          autoComplete={password.name}
          variant="outlined"
          type="password"
          onChange={onChange}
          component={DebouncedInput}
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
