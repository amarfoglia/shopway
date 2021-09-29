import React, { lazy } from 'react';
import { Route } from 'react-router-dom';
import MyRoute from '../components/MyRoute';

const SignupPage = lazy(() => import('../pages/auth/SingupPage'));
const ForgotPasswordPage = lazy(() => import('../pages/auth/ForgotPasswordPage'));
const LoginPage = lazy(() => import('../pages/auth/LoginPage'));
const NotAuthorized = lazy(() => import('../pages/NotAuthorized'));
const ChangePasswordPage = lazy(() => import('../pages/core/common/ChangePassword'));

const url = '/auth';

const AuthRouter = (): React.ReactElement => (
  <>
    <Route path={`${url}/notAuthorized`} render={() => <NotAuthorized />} />
    <MyRoute mustBeNotLoggedIn path={`${url}/signin`} render={() => <LoginPage />} />
    <MyRoute mustBeNotLoggedIn path={`${url}/signup`} render={() => <SignupPage />} />
    <MyRoute
      mustBeNotLoggedIn
      path={`${url}/forgotPassword`}
      render={() => <ForgotPasswordPage />}
    />
    <MyRoute mustBeLoggedIn path={`${url}/changePassword`} render={() => <ChangePasswordPage />} />
  </>
);

export default AuthRouter;
