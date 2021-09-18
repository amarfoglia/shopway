import React, { useContext } from 'react';
import { Route } from 'react-router';
import { Redirect, RouteProps } from 'react-router-dom';
import AuthContext from '../hooks/useAuth';
// import { AppError } from '../model/http';
import User from '../model/users/user';
import PATHS from '../utils/routes';
import Loader from './Loader';

const NotAuthorized = () => <Redirect to={{ pathname: PATHS.NOT_AUTHORIZED }} />;
const Login = () => <Redirect to={{ pathname: PATHS.SIGN_IN }} />;
const Home = () => <Redirect to={{ pathname: PATHS.HOME }} />;
// const ErrorPage = (errorMessage: string) => (
//   <Redirect to={{ pathname: PATHS.ERROR, state: errorMessage }} />
// );

type role = 'Customer' | 'Seller';

interface Props {
  mustBeLoggedIn?: boolean;
  mustBeNotLoggedIn?: boolean;
  mustBe?: role;
}

type AuthRouteProps = RouteProps & Props;

const _isRoleNotValid = (user?: User, role?: string) => role && (!user || user?.role !== role);

const _isNotLoggedIn = (user?: User, mustBeLoggedIn?: boolean) => mustBeLoggedIn && !user;

// const checkError = (error?: AppError | null, currentPath?: string) => {
//   console.log(error);
//   return error?.status === 500
//     ? () => ErrorPage(error.message)
//     : currentPath === PATHS.SIGN_IN
//     ? undefined
//     : Login;
// };

const AuthRoute: React.FC<AuthRouteProps> = ({
  mustBe,
  mustBeLoggedIn,
  mustBeNotLoggedIn,
  ...props
}) => {
  const { user, isLoading, error } = useContext(AuthContext);
  const renderComponent = () =>
    _isNotLoggedIn(user, mustBeLoggedIn)
      ? Login
      : _isRoleNotValid(user, mustBe)
      ? NotAuthorized
      : user && mustBeNotLoggedIn
      ? Home
      : // : error
        // ? checkError(error, props.location?.pathname)
        undefined;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { render, ...routerProps } = props;

  const renderPage = () => {
    const component = renderComponent();
    return component ? <Route component={component} {...routerProps} /> : <Route {...props} />;
  };

  return isLoading || (!user && !error) ? <Loader /> : renderPage();
};

export default AuthRoute;
