import React from 'react';
import { Button } from '@material-ui/core';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import IllustrationPage, { Position } from '../components/IllustrationPage';
import Routes from '../utils/routes';

type State = {
  error?: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Props = RouteComponentProps<any, any, State | any>;

const ErrorPage: React.FC<Props> = ({ location: { state } }): React.ReactElement => {
  const history = useHistory();
  const errorMessage = state ? (state as State).error : '';
  return (
    <IllustrationPage
      title="Something went wrong"
      subtitle={errorMessage}
      imagePath="/404.svg"
      imageAlt="Something went wrong"
      imagePosition={Position.CENTER}
    >
      <Button variant="contained" color="primary" onClick={() => history.push(Routes.HOME)}>
        Back home
      </Button>
    </IllustrationPage>
  );
};

export default ErrorPage;
