import React from 'react';
import { Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { ReactNode } from 'react';
import baseStyles from '../style/styles';

interface Props {
  title: string;
  header?: ReactNode;
}

const useStyles = makeStyles((theme) => ({
  container: {
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    background: `url(${process.env.PUBLIC_URL}/background.png)`,
  },
  title: {
    textAlign: 'left',
    paddingLeft: theme.spacing(4),
    color: 'white',
  },
  subContainer: {
    minHeight: '28vh',
    justifyContent: 'space-around',
    paddingTop: theme.spacing(1),
  },
}));

const AuthPage: React.FC<Props & ReactNode> = (props) => {
  const classes = baseStyles();
  const authClasses = useStyles();
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
          <Paper elevation={2} className={classes.paperPopup}>
            {props.children}
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AuthPage;
