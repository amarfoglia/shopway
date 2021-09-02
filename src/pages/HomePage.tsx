import React from 'react';
import Image from 'material-ui-image';
import { Grid, Button, Typography, Box } from '@material-ui/core';
import baseStyles, { homeStyles } from '../style/styles';
import { useHistory } from 'react-router-dom';
import PATHS from '../utils/routes';
import clsx from 'clsx';

const Home = (): React.ReactElement => {
  const baseClasses = baseStyles();
  const homeClasses = homeStyles();
  const history = useHistory();
  return (
    <Grid container className={clsx(baseClasses.container, homeClasses.container)}>
      <Grid item xs={12}>
        <Box width="80vw">
          <Image src={process.env.PUBLIC_URL + '/home.svg'} cover={true} />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h4" component="h1" gutterBottom>
          Get local fashion from home
        </Typography>
        <Typography variant="body1">Best way to buy retail products.</Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Button variant="contained" color="primary" onClick={() => history.push(PATHS.SIGN_IN)}>
          Get Started
        </Button>
      </Grid>
    </Grid>
  );
};

export default Home;
