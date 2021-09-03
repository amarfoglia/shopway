import React from 'react';
import { Typography } from '@material-ui/core';
import { FormikHelpers } from 'formik';
import { Link } from 'react-router-dom';

import { LoginFormModel } from '../../model/auth';
import LoginFields from './forms/LoginFields';
import { loginValidation } from '../../model/auth/validationSchema';
import { useContext } from 'react';
import AuthContext from '../../hooks/useAuth';
import baseStyles from '../../style/styles';
import PATHS from '../../utils/routes';
import MyForm from '../../components/MyForm';
import AuthPage from '../../components/AuthPage';

const { formId, formField } = LoginFormModel;

const initialValues = {
  [formField.email.name]: '',
  [formField.password.name]: '',
};

type Values = typeof initialValues;

const LoginPage: React.FC<void> = () => {
  const { login, error: loginError, isLoading } = useContext(AuthContext);
  const baseClasses = baseStyles();

  const handleSubmit = (values: Values, helpers: FormikHelpers<Values>) => {
    const { email, password } = values;
    login({ email, password });
    helpers.setSubmitting(isLoading);
  };

  const FormFooter = (
    <Typography variant="body2">
      Don&apos;t have an account?&nbsp;
      <Link to={PATHS.SIGN_UP} className={baseClasses.link}>
        Sign up
      </Link>
    </Typography>
  );

  return (
    <AuthPage title="Welcome back">
      <MyForm
        errors={loginError}
        handleSubmit={handleSubmit}
        validationSchema={loginValidation}
        initialValues={initialValues}
        footer={FormFooter}
        formId={formId}
        isSubmitting={isLoading}
      >
        <LoginFields formField={formField} />
      </MyForm>
    </AuthPage>
  );
};

export default LoginPage;
