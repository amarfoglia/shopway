import React, { useContext } from 'react';
import { Route } from 'react-router';
import { Redirect, RouteProps } from 'react-router-dom';
import AuthContext from '../hooks/useAuth';

export type NoAuthRouteProps = RouteProps;

const renderComponent = () => <Redirect to={{ pathname: '/home' }} />;

export const NoAuthRoute: React.FC<NoAuthRouteProps> = (props) => {
  const ctx = useContext(AuthContext);
  return ctx?.user ? <Route {...props} component={renderComponent} /> : <Route {...props} />;
};

export default NoAuthRoute;
