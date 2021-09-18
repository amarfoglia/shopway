import { makeStyles } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import React from 'react';

interface Props {
  text: string;
}

const useStyles = makeStyles((theme) => ({
  alert: {
    textAlign: 'left',
    borderRadius: theme.spacing(3),
  },
}));

const ErrorDisplay: React.FC<Props> = ({ text }) => {
  const classes = useStyles();
  return (
    <Alert severity="error" className={classes.alert}>
      <AlertTitle>Error</AlertTitle>
      {text}
    </Alert>
  );
};

const WarningDisplay: React.FC<Props> = ({ text }) => {
  const classes = useStyles();
  return (
    <Alert severity="warning" className={classes.alert}>
      {text}
    </Alert>
  );
};

export { WarningDisplay };

export default ErrorDisplay;
