import React, { lazy, ReactElement } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container, makeStyles } from '@material-ui/core';
import Loader from './components/Loader';
import MyRoute from './components/MyRoute';
import { ArticleRouter, AuthRouter, CustomerRouter, SellerRouter } from './routes';

const Home = lazy(() => import('./pages/HomePage'));
const ErrorPage = lazy(() => import('./pages/ErrorPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const StorePage = lazy(() => import('./pages/core/common/StorePage'));

const renderContent = () => {
  return (
    <React.Suspense fallback={<Loader />}>
      <Container maxWidth="lg" disableGutters style={{ height: '100%' }}>
        <Router>
          <Switch>
            <Route exact path={'/'} render={() => <Home />} />
            <Route path={'/error'} render={(props) => <ErrorPage {...props} />} />
            <MyRoute path="/auth" render={() => <AuthRouter />} />
            <MyRoute path="/customer" mustBe="Customer" render={() => <CustomerRouter />} />
            <MyRoute path="/seller" mustBe="Seller" render={() => <SellerRouter />} />
            <MyRoute path="/article" mustBeLoggedIn render={() => <ArticleRouter />} />
            <MyRoute path={'/stores/:id'} mustBeLoggedIn render={() => <StorePage />} />
            <Route path={'*'} render={() => <NotFoundPage />} />
          </Switch>
        </Router>
      </Container>
    </React.Suspense>
  );
};

const useStyles = makeStyles((theme) => ({
  App: {
    height: '100vh',
    backgroundColor: theme.palette.background.default,
  },
}));

const App = (): ReactElement => {
  const classes = useStyles();
  return <div className={classes.App}>{renderContent()}</div>;
};

export default App;
