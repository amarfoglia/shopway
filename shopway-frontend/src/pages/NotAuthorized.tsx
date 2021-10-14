import React from 'react';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import IllustrationPage, { Position } from '../components/IllustrationPage';
import Routes from '../utils/routes';

const NotAuthorized = (): React.ReactElement => {
  const history = useHistory();
  return (
    <IllustrationPage
      title="Not Authorized"
      imagePath="/404.svg"
      imageAlt="User doesn't have the necessary permissions"
      imagePosition={Position.CENTER}
    >
      <Button variant="contained" color="primary" onClick={() => history.push(Routes.HOME)}>
        Go home
      </Button>
    </IllustrationPage>
  );
};

export default NotAuthorized;
