import React from 'react';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import PATHS from '../utils/routes';
import IllustrationPage, { Position } from '../components/IllustrationPage';

const NotFoundPage = (): React.ReactElement => {
  const history = useHistory();
  return (
    <IllustrationPage
      title="404 not found"
      imagePath="/404.svg"
      imageAlt="Page not found"
      imagePosition={Position.CENTER}
    >
      <Button variant="contained" color="primary" onClick={() => history.push(PATHS.HOME)}>
        Return home
      </Button>
    </IllustrationPage>
  );
};

export default NotFoundPage;
