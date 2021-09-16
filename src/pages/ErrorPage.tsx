import React from 'react';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import IllustrationPage, { Position } from '../components/IllustrationPage';

interface Props {
  error: string;
}

const ErrorPage: React.FC<Props> = ({ error }): React.ReactElement => {
  const history = useHistory();
  return (
    <IllustrationPage
      title="Something went wrong"
      subtitle={error}
      imagePath="/404.svg"
      imageAlt="Something went wrong"
      imagePosition={Position.CENTER}
    >
      <Button variant="contained" color="primary" onClick={history.goBack}>
        Return back
      </Button>
    </IllustrationPage>
  );
};

export default ErrorPage;
