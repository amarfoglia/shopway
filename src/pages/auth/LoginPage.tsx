import React from 'react';
import { Typography } from '@material-ui/core';
import { FormikHelpers, FormikValues } from 'formik';
import { Link } from 'react-router-dom';
import { useMutation } from 'react-query';

import { LoginFormModel } from '../../model/validation';
import LoginFields from './forms/LoginFields';
import { loginValidation } from '../../model/validation/validationSchema';
import { useContext } from 'react';
import AuthContext from '../../hooks/useAuth';
import baseStyles from '../../style/styles';
import PATHS from '../../utils/routes';
import MyForm from '../../components/MyForm';
import AuthPage from '../../components/AuthPage';
import { AppError } from '../../model/http';
import User from '../../model/users/user';
import { Payload } from '../../utils/axiosClient';

const { formId, formField } = LoginFormModel;

const initialValues = {
  user: {
    email: '',
    password: '',
  },
};

interface LoginProps {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const classes = baseStyles();
  const { login } = useContext(AuthContext);
  const {
    error,
    isLoading,
    mutate: loginUser,
  } = useMutation<Payload<User>, AppError, LoginProps>(login);

  const handleSubmit = (values: FormikValues, helpers: FormikHelpers<FormikValues>) => {
    const { user } = values;
    loginUser(user);
    helpers.setSubmitting(isLoading);
  };

  const FormFooter = (
    <Typography variant="body2">
      Don&apos;t have an account?&nbsp;
      <Link to={PATHS.SIGN_UP} className={classes.link}>
        Sign up
      </Link>
    </Typography>
  );

  return (
    <AuthPage title="Welcome back">
      <MyForm
        errors={error?.message}
        handleSubmit={handleSubmit}
        validationSchema={loginValidation}
        initialValues={initialValues}
        footer={FormFooter}
        formId={formId}
        isSubmitting={isLoading}
        form={(h) => <LoginFields formField={formField} onChange={h} />}
      />
    </AuthPage>
  );
};

export default LoginPage;
