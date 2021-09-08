import React, { lazy, ReactElement } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from '@material-ui/core';
import AuthRoute from './components/AuthRoute';
import PATHS from './utils/routes';
import baseStyles from './style/styles';
import Loader from './components/Loader';

const SignupPage = lazy(() => import('./pages/auth/SingupPage'));
const Home = lazy(() => import('./pages/HomePage'));
const LoginPage = lazy(() => import('./pages/auth/LoginPage'));
const CustomerPage = lazy(() => import('./pages/core/customer/MainPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const NotAuthorized = lazy(() => import('./pages/NotAuthorized'));
const ForgotPasswordPage = lazy(() => import('./pages/auth/ForgotPasswordPage'));
const StorePage = lazy(() => import('./pages/core/common/StorePage'));
const CustomerProfile = lazy(() => import('./pages/core/customer/CustomerProfile'));

const renderContent = () => {
  const classes = baseStyles();
  return (
    <Router>
      <Container className={classes.root} disableGutters maxWidth="md">
        <React.Suspense fallback={<Loader />}>
          <Switch>
            <Route exact path={PATHS.HOME} render={() => <Home />} />
            <AuthRoute mustBeNotLoggedIn path={PATHS.SIGN_IN} render={() => <LoginPage />} />
            <AuthRoute mustBeNotLoggedIn path={PATHS.SIGN_UP} render={() => <SignupPage />} />
            <AuthRoute
              mustBeNotLoggedIn
              path={PATHS.FORGOT_PASSWORD}
              render={() => <ForgotPasswordPage />}
            />
            <AuthRoute path={PATHS.CUSTOMER_MAIN} render={() => <CustomerPage />} />
            <Route path={PATHS.CUSTOMER_PROFILE} render={() => <CustomerProfile />} />;
            <AuthRoute path={PATHS.STORE_PAGE} render={() => <StorePage />} />
            <Route path={PATHS.NOT_AUTHORIZED} render={() => <NotAuthorized />} />
            <Route path={PATHS.NOT_FOUND} render={() => <NotFoundPage />} />
          </Switch>
        </React.Suspense>
      </Container>
    </Router>
  );
};

const App = (): ReactElement => {
  return <div className="App">{renderContent()}</div>;
};

export default App;
