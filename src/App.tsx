import React, { ReactElement } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from '@material-ui/core';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import NavBar from './components/NavBar';

const renderContent = () => (
  <Router>
    <NavBar />
    <Container maxWidth="md">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <ProtectedRoute path="/dashboard" component={Dashboard} />
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
