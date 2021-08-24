import React, { useContext } from 'react';
import { Route } from 'react-router';
import { Redirect, RouteProps } from 'react-router-dom';
import AuthContext from '../hooks/useAuth';

export type ProtectedRouteProps = RouteProps;

export const ProtectedRoute: React.FC<ProtectedRouteProps> = (props) => {
  const ctx = useContext(AuthContext);

  if (ctx?.user) {
    return <Route {...props} />;
  } else {
    const renderComponent = () => <Redirect to={{ pathname: '/login' }} />;
    return <Route {...props} component={renderComponent} render={undefined} />;
  }
};

export default ProtectedRoute;
