import { CircularProgress, Typography } from '@material-ui/core';
import React, { ReactElement } from 'react';
import { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { LoginForm } from '../components/LoginForm';
import AuthContext, { UserContext } from '../hooks/useAuth';

const renderContent = (login: (email: string, password: string) => void) => (
  <div>
    <Typography component="h1" variant="h5">
      Sign in
    </Typography>
    <LoginForm onSubmit={(email, password) => login(email, password)} />
  </div>
);

const Login = (): ReactElement => {
  const { isLoading, login, user } = useContext(AuthContext) as UserContext;
  return isLoading ? (
    <CircularProgress />
  ) : user ? (
    <Redirect to="/dashboard" />
  ) : (
    renderContent(login)
  );
};

export default Login;
