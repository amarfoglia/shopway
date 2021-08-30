import React, { ReactElement } from 'react';
import Image from 'material-ui-image';
import { Grid, Button, Typography, Box } from '@material-ui/core';
import useStyles from '../style/landingStyles';
import { useHistory } from 'react-router-dom';
import PATHS from '../utils/routes';

const NotFoundPage = (): ReactElement => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Typography variant="h4" className={classes.title} color="primary" gutterBottom>
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
