import React from 'react';
import { Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import { ReactNode } from 'react';

interface Props {
  title: string;
  header?: ReactNode;
}

const useStyles = makeStyles((theme) => ({
  container: {
    justifyContent: 'space-between',
    [theme.breakpoints.down('xs')]: {
      background: `url(${process.env.PUBLIC_URL}/background.png)`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      display: 'flex',
      minHeight: '100%',
    },
  },
  titleContainer: {
    padding: `${theme.spacing(5)}px ${theme.spacing(4)}px`,
    paddingTop: theme.spacing(6),
    [theme.breakpoints.down('xs')]: {
      maxWidth: 'min-content',
    },
  },
  popupContainer: {
    [theme.breakpoints.up('sm')]: {
      top: 0,
    },
    [theme.breakpoints.down('sm')]: {
      margin: 'auto',
      marginBottom: 0,
      bottom: 0,
    },
  },
  paperPopup: {
    borderRadius: theme.spacing(2),
    padding: `${theme.spacing(5)}px ${theme.spacing(4)}px`,
    margin: '0 auto',
    textAlign: 'center',
    [theme.breakpoints.down('xs')]: {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },
    [theme.breakpoints.up('sm')]: {
      maxWidth: 400,
    },
  },
  title: {
    [theme.breakpoints.down('xs')]: {
      textAlign: 'left',
      color: 'white',
    },
    [theme.breakpoints.up('sm')]: {
      textAlign: 'center',
      color: theme.palette.primary.main,
    },
    fontWeight: 'bold',
  },
}));

const AuthPage: React.FC<Props & ReactNode> = (props) => {
  const classes = useStyles();
  const { title, header } = props;

  return (
    <Grid container className={classes.container}>
      <Grid item xs={12} className={classes.titleContainer}>
        <Typography component="h1" variant="h3" className={classes.title}>
          {title}
        </Typography>
      </Grid>
      <Grid item xs={12} style={{ display: 'flex' }}>
        <Grid container className={classes.popupContainer}>
          {header && header}
          <Grid item xs={12}>
            <Paper elevation={2} className={classes.paperPopup}>
              {props.children}
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AuthPage;
