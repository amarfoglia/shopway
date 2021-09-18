import React, { lazy, useContext } from 'react';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import PATHS from '../utils/routes';
import { Position } from '../components/IllustrationPage';
import AuthContext from '../hooks/useAuth';
import Role from '../model/users/role';

const { SIGN_IN, CUSTOMER_MAIN } = PATHS;

const IllustrationPage = lazy(() => import('../components/IllustrationPage'));

const Home = (): React.ReactElement => {
  const history = useHistory();
  const { user } = useContext(AuthContext);

  const handlePath = !user
    ? SIGN_IN
    : user.role === Role.CUSTOMER
    ? CUSTOMER_MAIN
    : PATHS.CHANGE_PASSWORD;

  return (
    <IllustrationPage
      title="Get local fashion from home"
      subtitle="Best way to buy retail products."
      imagePath="/home.svg"
      imageAlt="Landing image"
      imagePosition={Position.TOP}
    >
      <Button variant="contained" color="primary" onClick={() => history.push(handlePath)}>
        Get Started
      </Button>
    </IllustrationPage>
  );
};

export default Home;
