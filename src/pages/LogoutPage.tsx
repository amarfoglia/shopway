import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Routes from '../utils/routes';
import AuthContext from '../hooks/useAuth';
import Loader from '../components/Loader';
import { useEffect } from 'react';

const { HOME } = Routes;

const Logout = (): React.ReactElement => {
  const history = useHistory();
  const { user, reset } = useContext(AuthContext);

  useEffect(reset, []);

  useEffect(() => {
    !user && history.push(HOME);
  }, [user]);

  return <Loader position="absolute" />;
};

export default Logout;
