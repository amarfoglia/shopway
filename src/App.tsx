import React, { lazy, ReactElement } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from '@material-ui/core';
// import AuthRoute from './components/AuthRoute';
import NoAuthRoute from './components/NoAuthRoute';
import PATHS from './utils/routes';
import baseStyles from './style/styles';
import Loader from './components/Loader';

const SignupPage = lazy(() => import('./pages/auth/SingupPage'));
const Home = lazy(() => import('./pages/HomePage'));
const LoginPage = lazy(() => import('./pages/auth/LoginPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const ForgotPasswordPage = lazy(() => import('./pages/auth/ForgotPasswordPage'));

const renderContent = () => {
  const classes = baseStyles();
  return (
    <Router>
      {/* <NavBar /> */}
      <Container className={classes.root} maxWidth="md">
        <React.Suspense fallback={<Loader />}>
          <Switch>
            <Route exact path={PATHS.HOME} render={() => <Home />} />
            <NoAuthRoute path={PATHS.SIGN_IN} render={() => <LoginPage />} />
            <NoAuthRoute path={PATHS.SIGN_UP} render={() => <SignupPage />} />
            <NoAuthRoute path={PATHS.FORGOT_PASSWORD} render={() => <ForgotPasswordPage />} />
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
