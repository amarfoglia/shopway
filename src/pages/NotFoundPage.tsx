import React from 'react';
import Image from 'material-ui-image';
import { Grid, Button, Typography, Box } from '@material-ui/core';
import baseStyles, { homeStyles } from '../style/styles';
import { useHistory } from 'react-router-dom';
import PATHS from '../utils/routes';
import clsx from 'clsx';

const NotFoundPage = (): React.ReactElement => {
  const baseclasses = baseStyles();
  const homeClasses = homeStyles();
  const history = useHistory();
  return (
    <Grid container className={clsx(baseclasses.container, homeClasses.container)}>
      <Grid item xs={12}>
        <Typography variant="h4" component="h1" className={baseclasses.title} gutterBottom>
          404 Not Found
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Box width="80vw">
          <Image src={process.env.PUBLIC_URL + '/404.svg'} cover={true} />
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Button variant="contained" color="primary" onClick={() => history.push(PATHS.HOME)}>
          Return home
        </Button>
      </Grid>
    </Grid>
  );
};

export default NotFoundPage;
