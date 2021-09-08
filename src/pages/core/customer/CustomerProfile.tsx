import React from 'react';
import { Container, Grid, IconButton, makeStyles } from '@material-ui/core';
import ArrowBackIosOutlined from '@material-ui/icons/ArrowBackIosOutlined';
import FavoriteOutlined from '@material-ui/icons/FavoriteOutlined';
import { useHistory, useParams } from 'react-router-dom';
import CorePage from '../../../components/CorePage';
import TopSection from '../../../components/TopSection';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: `${theme.spacing(4)}px ${theme.spacing(3)}px`,
    backgroundColor: '#f9f9f9',
  },
}));

const CustomerProfile = (): React.ReactElement => {
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams<{ id: string }>();

  console.log(`must fetch user with id ${id}`);

  const sections = [
    {
      node: <p>User</p>,
    },
  ];

  return (
    <Container maxWidth="md" className={classes.container}>
      <Grid container spacing={2} direction="column">
        <Grid item xs={12}>
          <TopSection
            variant="simple"
            leftChild={
              <IconButton onClick={history.goBack}>
                <ArrowBackIosOutlined />
              </IconButton>
            }
            rightChild={
              <IconButton>
                <FavoriteOutlined color={'primary'} />
              </IconButton>
            }
          />
        </Grid>
        <Grid item xs={12}>
          <CorePage sections={sections} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default CustomerProfile;
