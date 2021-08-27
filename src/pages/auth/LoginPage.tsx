import React from 'react';
import { Button, Typography, CircularProgress } from '@material-ui/core';
import { Formik, Form, FormikHelpers } from 'formik';

import { LoginFormModel } from '../../model/auth';
import LoginForm from './forms/LoginForm';
import { loginValidation } from '../../model/auth/validationSchema';

const { formId, formField } = LoginFormModel;

const initialValues = {
  [formField.email.name]: '',
  [formField.password.name]: '',
};

type Values = typeof initialValues;

const LoginPage: React.FC<void> = () => {
  function _handleSubmit(values: Values, helpers: FormikHelpers<Values>) {
    helpers.setSubmitting(false);
  }

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
          {({ isSubmitting }) => (
            <Form id={formId}>
              <LoginForm formField={formField} />
              <div>
                <div>
                  <Button disabled={isSubmitting} type="submit" variant="contained" color="primary">
                    Confirm
                  </Button>
                  {isSubmitting && <CircularProgress size={24} />}
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </React.Fragment>
    </React.Fragment>
  );
};

export default LoginPage;
