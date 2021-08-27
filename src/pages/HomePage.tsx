import React, { ReactElement } from 'react';
import { useContext } from 'react';
import AuthContext from '../hooks/useAuth';

const Home = (): ReactElement => {
  const ctx = useContext(AuthContext);
  return (
    <div style={{ backgroundColor: '#cfe8fc', height: '100vh' }}>
      <h2>Home</h2>
      {ctx?.user && <p>Hi {ctx?.user.name}</p>}
    </div>
  );
};

export default Home;
