import { makeStyles, Theme } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import React from 'react';

interface Props {
  text: string;
  absolute?: boolean;
}

const useStyles = makeStyles<Theme, { absolute: boolean }>((theme) => ({
  alert: {
    textAlign: 'left',
    borderRadius: theme.spacing(3),
    top: (props) => (props.absolute ? '30%' : 'inherit'),
    position: (props) => (props.absolute ? 'absolute' : 'inherit'),
    margin: (props) => (props.absolute ? `0px ${theme.spacing(3)}px` : 'inherit'),
  },
}));

const ErrorDisplay: React.FC<Props> = ({ text, absolute = false }) => {
  const classes = useStyles({ absolute });
  return (
    <Alert severity="error" className={classes.alert}>
      <AlertTitle>Error</AlertTitle>
      {text}
    </Alert>
  );
};

const WarningDisplay: React.FC<Props> = ({ text, absolute = false }) => {
  const classes = useStyles({ absolute });
  return (
    <Alert severity="warning" className={classes.alert}>
      {text}
    </Alert>
  );
};

export { WarningDisplay };

export default ErrorDisplay;
