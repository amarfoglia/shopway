import React, { lazy } from 'react';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import PATHS from '../utils/routes';
import { Position } from '../components/IllustrationPage';

const IllustrationPage = lazy(() => import('../components/IllustrationPage'));

const Home = (): React.ReactElement => {
  const history = useHistory();
  return (
    <IllustrationPage
      title="Get local fashion from home"
      subtitle="Best way to buy retail products."
      imagePath="/home.svg"
      imageAlt="Landing image"
      imagePosition={Position.TOP}
    >
      <Button variant="contained" color="primary" onClick={() => history.push(PATHS.SIGN_IN)}>
        Get Started
      </Button>
    </IllustrationPage>
  );
};

export default Home;
