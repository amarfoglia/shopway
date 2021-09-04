import React, { lazy, ReactElement } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { CircularProgress, Container, makeStyles } from '@material-ui/core';
// import AuthRoute from './components/AuthRoute';
import NoAuthRoute from './components/NoAuthRoute';
import PATHS from './utils/routes';

const SignupPage = lazy(() => import('./pages/auth/SingupPage'));
const Home = lazy(() => import('./pages/HomePage'));
const LoginPage = lazy(() => import('./pages/auth/LoginPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const ForgotPasswordPage = lazy(() => import('./pages/auth/ForgotPasswordPage'));

const useStyles = makeStyles({
  root: {
    height: '100vh',
    padding: 0,
  },
});

const renderContent = () => {
  const classes = useStyles();
  return (
    <Router>
      {/* <NavBar /> */}
      <Container className={classes.root} maxWidth="md">
        <React.Suspense fallback={<CircularProgress size={24} />}>
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
