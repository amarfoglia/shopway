import React from 'react';
import { makeStyles, Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1.5),
    boxShadow: '0 5px 5px rgb(0 37 132 / 6%)',
    borderRadius: theme.spacing(2),
  },
}));

const MyPaper: React.FC = ({ children }) => {
  const classes = useStyles();

  return <Paper className={classes.root}>{children}</Paper>;
};

export default MyPaper;
