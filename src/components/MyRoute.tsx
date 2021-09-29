import React, { useContext } from 'react';
import { Route } from 'react-router';
import { Redirect, RouteProps } from 'react-router-dom';
import AuthContext from '../hooks/useAuth';
import User from '../model/users/user';
import Routes from '../utils/routes';
import Loader from './Loader';

const NotAuthorized = () => <Redirect to={{ pathname: Routes.NOT_AUTHORIZED }} />;
const Login = () => <Redirect to={{ pathname: Routes.SIGN_IN }} />;
const Home = () => <Redirect to={{ pathname: Routes.HOME }} />;
const Seller = () => <Redirect to={{ pathname: Routes.SELLER_MAIN }} />;
const Customer = () => <Redirect to={{ pathname: Routes.CUSTOMER_MAIN }} />;

type role = 'Customer' | 'Seller';

interface Props {
  mustBeLoggedIn?: boolean;
  mustBeNotLoggedIn?: boolean;
  mustBe?: role;
}

type MyRouteProps = RouteProps & Props;

const _isRoleNotValid = (user?: User, role?: string) => role && (!user || user?.role !== role);

const _isNotLoggedIn = (user?: User, mustBeLoggedIn?: boolean) => mustBeLoggedIn && !user;

const handleLoggedUserRedirect = (role?: string) =>
  role === 'Customer' ? Customer : role === 'Seller' ? Seller : Home;

const MyRoute: React.FC<MyRouteProps> = ({
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
      ? handleLoggedUserRedirect()
      : undefined;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { render, ...routerProps } = props;

  const renderPage = () => {
    const component = renderComponent();
    return component ? <Route component={component} {...routerProps} /> : <Route {...props} />;
  };

  return isLoading || (!user && !error) ? <Loader /> : renderPage();
};

export default MyRoute;
