import React, { lazy, ReactElement } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container, makeStyles } from '@material-ui/core';
import AuthRoute from './components/AuthRoute';
import PATHS from './utils/routes';
import Loader from './components/Loader';
import ProductPage from './pages/core/common/ArticlePage';

const SignupPage = lazy(() => import('./pages/auth/SingupPage'));
const Home = lazy(() => import('./pages/HomePage'));
const LoginPage = lazy(() => import('./pages/auth/LoginPage'));
const CustomerPage = lazy(() => import('./pages/core/customer/MainPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const NotAuthorized = lazy(() => import('./pages/NotAuthorized'));
const ForgotPasswordPage = lazy(() => import('./pages/auth/ForgotPasswordPage'));
const StorePage = lazy(() => import('./pages/core/common/StorePage'));
const UserProfile = lazy(() => import('./pages/core/customer/UserProfile'));
const ChangePasswordPage = lazy(() => import('./pages/core/common/ChangePassword'));
const SearchPage = lazy(() => import('./pages/core/search.article/SearchPage'));
const CustomerEditProfile = lazy(() => import('./pages/core/customer/EditProfile'));
const ErrorPage = lazy(() => import('./pages/ErrorPage'));
const SellerPage = lazy(() => import('./pages/core/seller/MainPage'));

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    backgroundColor: theme.palette.background.default,
  },
}));

const renderContent = () => {
  const classes = useStyles();
  return (
    <Router>
      <Container className={classes.root} disableGutters maxWidth="lg">
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
            <AuthRoute exact path={PATHS.CUSTOMER_MAIN} render={() => <CustomerPage />} />
            <AuthRoute path={PATHS.CUSTOMER_EDIT} render={() => <CustomerEditProfile />} />
            <AuthRoute exact path={PATHS.SELLER_MAIN} render={() => <SellerPage />} />
            <AuthRoute path={PATHS.CHANGE_PASSWORD} render={() => <ChangePasswordPage />} />
            <AuthRoute path={PATHS.USER_PROFILE} render={() => <UserProfile />} />
            <AuthRoute path={PATHS.SEARCH_ARTICLE} render={() => <SearchPage />} />
            <AuthRoute
              path={PATHS.ARTICLE_DETAILS}
              render={(props) => <ProductPage {...props} />}
            />
            <AuthRoute path={PATHS.STORE_PAGE} render={() => <StorePage />} />
            <Route path={PATHS.NOT_AUTHORIZED} render={() => <NotAuthorized />} />
            <Route
              path={PATHS.ERROR}
              render={({ location }) => <ErrorPage error={location.state as string} />}
            />
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
