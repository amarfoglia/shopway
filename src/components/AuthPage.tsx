import React from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { ReactNode } from 'react';
import baseStyles, { authStyles } from '../style/styles';

interface Props {
  title: string;
  header?: ReactNode;
}

const AuthPage: React.FC<Props & ReactNode> = (props) => {
  const classes = baseStyles();
  const authClasses = authStyles();
  const { title, header } = props;

  return (
    <Grid container className={clsx(classes.container, authClasses.container)}>
      <Grid container className={clsx(classes.container, authClasses.subContainer)}>
        <Grid item xs={10}>
          <Typography
            component="h1"
            variant="h3"
            className={clsx(classes.title, authClasses.title)}
          >
            {title}
          </Typography>
        </Grid>
      </Grid>
      <Grid item container xs={12} className={classes.container}>
        {header && header}
        <Grid item>
          <Paper elevation={3} className={classes.paperPopup}>
            {props.children}
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AuthPage;
