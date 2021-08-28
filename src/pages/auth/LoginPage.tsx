import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { Formik, Form, FormikHelpers } from 'formik';

import { LoginFormModel } from '../../model/auth';
import LoginForm from './forms/LoginForm';
import { loginValidation } from '../../model/auth/validationSchema';
import { useContext } from 'react';
import AuthContext from '../../hooks/useAuth';
import LoadButton from '../../components/formFields/LoadButton';

const { formId, formField } = LoginFormModel;

const initialValues = {
  [formField.email.name]: '',
  [formField.password.name]: '',
};

type Values = typeof initialValues;

const LoginPage: React.FC<void> = () => {
  const { login, error: loginError, isLoading } = useContext(AuthContext);

  const _handleSubmit = (values: Values, helpers: FormikHelpers<Values>) => {
    const { email, password } = values;
    login(email, password);
    helpers.setSubmitting(isLoading);
  };

  return (
    <React.Fragment>
      <Typography component="h1" variant="h4" align="center">
        Login
      </Typography>
      <React.Fragment>
        <Formik
          initialValues={initialValues}
          validationSchema={loginValidation}
          onSubmit={_handleSubmit}
        >
          {() => (
            <Form id={formId}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <LoginForm formField={formField} />
                </Grid>
                <Grid item xs={12}>
                  <Typography color="error" variant="body2" gutterBottom>
                    {loginError}
                  </Typography>
                  <LoadButton isSubmitting={isLoading} text={'Confirm'} variant="outlined" />
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </React.Fragment>
    </React.Fragment>
  );
};

export default LoginPage;
