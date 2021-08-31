import React from 'react';
import { Grid, Typography, Paper } from '@material-ui/core';
import { Formik, Form, FormikHelpers } from 'formik';

import { LoginFormModel } from '../../model/auth';
import LoginForm from './forms/LoginForm';
import { loginValidation } from '../../model/auth/validationSchema';
import { useContext } from 'react';
import AuthContext from '../../hooks/useAuth';
import LoadButton from '../../components/formFields/LoadButton';
import baseStyles, { loginStyles } from '../../style/styles';
import clsx from 'clsx';

const { formId, formField } = LoginFormModel;

const initialValues = {
  [formField.email.name]: '',
  [formField.password.name]: '',
};

type Values = typeof initialValues;

const LoginPage: React.FC<void> = () => {
  const { login, error: loginError, isLoading } = useContext(AuthContext);
  const baseClasses = baseStyles();
  const loginClasses = loginStyles();

  const _handleSubmit = (values: Values, helpers: FormikHelpers<Values>) => {
    const { email, password } = values;
    login(email, password);
    helpers.setSubmitting(isLoading);
  };

  return (
    <Grid container className={clsx(baseClasses.container, loginClasses.container)}>
      <Grid item xs={6}>
        <Typography
          component="h1"
          variant="h4"
          className={clsx(baseClasses.title, loginClasses.title)}
          gutterBottom
        >
          Welcome Back
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Paper elevation={3} className={baseClasses.paperPopup}>
          <Formik
            initialValues={initialValues}
            validationSchema={loginValidation}
            onSubmit={_handleSubmit}
          >
            {() => (
              <Form id={formId}>
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <Typography color="error" variant="body2" gutterBottom>
                      {loginError}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <LoginForm formField={formField} />
                  </Grid>
                  <Grid item xs={12}>
                    <LoadButton
                      isSubmitting={isLoading}
                      text={'Confirm'}
                      variant="contained"
                      color="primary"
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
