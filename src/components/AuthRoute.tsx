import React, { useContext } from 'react';
import { Route } from 'react-router';
import { Redirect, RouteProps } from 'react-router-dom';
import AuthContext from '../hooks/useAuth';
import User from '../model/User';
import PATHS from '../utils/routes';

const NotAuthorized = () => <Redirect to={{ pathname: PATHS.NOT_AUTHORIZED }} />;
const Home = () => <Redirect to={{ pathname: PATHS.HOME }} />;

type role = 'Customer' | 'Seller';

interface Props {
  mustBeLoggedIn?: boolean;
  mustBeNotLoggedIn?: boolean;
  mustBe?: role;
}

type AuthRouteProps = RouteProps & Props;

const _isRoleNotValid = (user?: User, role?: string) => role && (!user || user.role !== role);

const _isNotLoggedIn = (user?: User, mustBeLoggedIn?: boolean) => mustBeLoggedIn && !user;

export const AuthRoute: React.FC<AuthRouteProps> = ({
  mustBe,
  mustBeLoggedIn,
  mustBeNotLoggedIn,
  ...props
}) => {
  const user = useContext(AuthContext)?.user;
  const component =
    _isNotLoggedIn(user, mustBeLoggedIn) || _isRoleNotValid(user, mustBe)
      ? NotAuthorized
      : mustBeNotLoggedIn && user
      ? Home
      : undefined;

  return <Route {...props} component={component} />;
};

export default AuthRoute;
