import React, { ReactElement } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container, makeStyles } from '@material-ui/core';
import Home from './pages/HomePage';
import AuthRoute from './components/AuthRoute';
import Login from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SingupPage';
import NoAuthRoute from './components/NoAuthRoute';
import PATHS from './utils/routes';
import NotFoundPage from './pages/NotFoundPage';

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
        <Switch>
          <Route exact path={PATHS.HOME} component={Home} />
          <NoAuthRoute path={PATHS.SIGN_IN} component={Login} />
          <NoAuthRoute path={PATHS.SIGN_UP} component={SignupPage} />
          <AuthRoute path="/dashboard" component={Dashboard} />
          <Route path={PATHS.NOT_FOUND} component={NotFoundPage} />
        </Switch>
      </Container>
    </Router>
  );
};

const App = (): ReactElement => {
  return <div className="App">{renderContent()}</div>;
};

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}

export default App;
