import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = (): React.ReactElement => (
  <div>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>
    </ul>
    <hr />
  </div>
);

export default NavBar;
