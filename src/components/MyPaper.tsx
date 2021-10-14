import React from 'react';
import { makeStyles, Paper, PaperProps, Theme } from '@material-ui/core';
import clsx from 'clsx';

interface Props {
  p?: number;
  customStyle?: string;
}

const useStyles = makeStyles<Theme, Props>((theme) => ({
  root: {
    padding: (props) => props.p ?? theme.spacing(1.5),
    boxShadow: '0 0 15px 2px #efefef',
    borderRadius: theme.spacing(1.5),
  },
}));

const MyPaper: React.FC<PaperProps & Props> = ({ children, p, customStyle, ...props }) => {
  const classes = useStyles({ p });

  return (
    <Paper className={clsx(classes.root, customStyle)} {...props}>
      {children}
    </Paper>
  );
};

export default MyPaper;
