import React, { useContext } from 'react';
import { Route } from 'react-router';
import { Redirect, RouteProps } from 'react-router-dom';
import AuthContext from '../hooks/useAuth';
import User from '../model/users/user';
import { ConnectionError } from '../utils/axiosClient';
import PATHS from '../utils/routes';
import Loader from './Loader';

const NotAuthorized = () => <Redirect to={{ pathname: PATHS.NOT_AUTHORIZED }} />;
const Home = () => <Redirect to={{ pathname: PATHS.HOME }} />;
const ErrorPage = (error: ConnectionError) => (
  <Redirect to={{ pathname: PATHS.ERROR, state: error.message }} />
);

type role = 'Customer' | 'Seller';

interface Props {
  mustBeLoggedIn?: boolean;
  mustBeNotLoggedIn?: boolean;
  mustBe?: role;
}

type AuthRouteProps = RouteProps & Props;

const _isRoleNotValid = (user?: User, role?: string) => role && (!user || user.role !== role);

const _isNotLoggedIn = (user?: User, mustBeLoggedIn?: boolean) => mustBeLoggedIn && !user;

const AuthRoute: React.FC<AuthRouteProps> = ({
  mustBe,
  mustBeLoggedIn,
  mustBeNotLoggedIn,
  ...props
}) => {
  const { user, isLoading, error } = useContext(AuthContext);

  const renderComponent = () =>
    error
      ? () => ErrorPage(error)
      : _isNotLoggedIn(user, mustBeLoggedIn) || _isRoleNotValid(user, mustBe)
      ? NotAuthorized
      : mustBeNotLoggedIn && user
      ? Home
      : undefined;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { render, ...routerProps } = props;

  const renderPage = () => {
    const component = renderComponent();
    return component ? <Route component={component} {...routerProps} /> : <Route {...props} />;
  };

  return isLoading || (!user && !error) ? <Loader /> : renderPage();
};

export default AuthRoute;
