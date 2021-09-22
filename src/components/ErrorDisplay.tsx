import { makeStyles, Theme } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import React from 'react';

interface Props {
  text: string;
  absolute?: boolean;
  mb?: number;
}

const useStyles = makeStyles<Theme, Props>((theme) => ({
  alert: {
    textAlign: 'left',
    borderRadius: theme.spacing(3),
    top: (props) => (props.absolute ? '30%' : 'inherit'),
    position: (props) => (props.absolute ? 'absolute' : 'inherit'),
    margin: (props) => (props.absolute ? `0px ${theme.spacing(3)}px` : 'inherit'),
    marginBottom: (props) => (props.mb ? theme.spacing(props.mb) : 'inherit'),
  },
}));

const ErrorDisplay: React.FC<Props> = (props) => {
  const classes = useStyles(props);
  return (
    <Alert severity="error" className={classes.alert}>
      <AlertTitle>Error</AlertTitle>
      {props.text}
    </Alert>
  );
};

const WarningDisplay: React.FC<Props> = (props) => {
  const classes = useStyles(props);
  return (
    <Alert severity="warning" className={classes.alert}>
      {props.text}
    </Alert>
  );
};

export { WarningDisplay };

export default ErrorDisplay;
