import React, { ReactElement } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from '@material-ui/core';
import Home from './pages/HomePage';
import AuthRoute from './components/AuthRoute';
import Login from './pages/auth/LoginPage';
import NavBar from './components/NavBar';
import SignupPage from './pages/auth/SingupPage';
import NoAuthRoute from './components/NoAuthRoute';

const renderContent = () => (
  <Router>
    <NavBar />
    <Container maxWidth="md">
      <Switch>
        <Route exact path="/" component={Home} />
        <NoAuthRoute path="/login" component={Login} />
        <NoAuthRoute path="/register" component={SignupPage} />
        <AuthRoute path="/dashboard" component={Dashboard} />
      </Switch>
    </Container>
  </Router>
);

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
