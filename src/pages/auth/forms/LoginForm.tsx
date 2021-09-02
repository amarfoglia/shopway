import { Grid, makeStyles, Typography } from '@material-ui/core';
import MailOutlineOutlined from '@material-ui/icons/MailOutlineOutlined';
import LockOutlined from '@material-ui/icons/LockOutlined';
import { Field } from 'formik';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { InputField } from '../../../components/formFields';
import { LoginFormModel } from '../../../model/auth';
import PATHS from '../../../utils/routes';

interface Props {
  formField: typeof LoginFormModel.formField;
}

const useStyles = makeStyles(() => ({
  resetLink: {
    textAlign: 'end',
  },
  link: {
    textDecoration: 'none',
  },
}));

const LoginForm: React.FC<Props> = ({ formField: { email, password } }) => {
  const classes = useStyles();
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
        <Typography variant="body2" className={classes.resetLink}>
          <Link to={PATHS.RESET_PASSWORD} className={classes.link}>
            Forgot password?
          </Link>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default LoginForm;
