import React, { useContext } from 'react';
import { Route } from 'react-router';
import { Redirect, RouteProps } from 'react-router-dom';
import AuthContext from '../hooks/useAuth';

export type AuthRouteProps = RouteProps;

const renderComponent = () => <Redirect to={{ pathname: '/login' }} />;

export const AuthRoute: React.FC<AuthRouteProps> = (props) => {
  const ctx = useContext(AuthContext);
  return ctx?.user ? <Route {...props} /> : <Route {...props} component={renderComponent} />;
};

export default AuthRoute;
