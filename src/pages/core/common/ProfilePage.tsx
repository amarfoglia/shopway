import React from 'react';
import { Container, Grid, IconButton, makeStyles } from '@material-ui/core';
import ArrowBackIosOutlined from '@material-ui/icons/ArrowBackIosOutlined';
import { useHistory, useParams } from 'react-router-dom';
import CorePage from '../../../components/CorePage';
import TopSection from '../../../components/TopBar';
import ProfileSection from './ProfileSections';

interface Props {
  title: string;
  subtitle1?: string;
  subtitle2?: string;
  rightChild?: React.ReactNode;
  sections: {
    node: JSX.Element;
    title?: string;
  }[];
}

const useStyles = makeStyles((theme) => ({
  container: {
    padding: `${theme.spacing(4)}px ${theme.spacing(3)}px`,
    backgroundColor: '#f9f9f9',
    height: '100%',
  },
}));

const ProfilePage: React.FC<Props> = ({
  title,
  subtitle1,
  subtitle2,
  rightChild,
  sections,
}): React.ReactElement => {
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams<{ id: string }>();

  const ProfileNode = () => (
    <ProfileSection
      key="profile-section"
      title={title}
      subtitle1={subtitle1}
      subtitle2={subtitle2}
    />
  );

  console.log(`must fetch resource with id ${id}`);

  return (
    <Container maxWidth="md" className={classes.container}>
      <Grid container spacing={2} direction="column">
        <Grid item xs={12}>
          <TopSection
            variant="simple"
            leftChild={
              <IconButton onClick={history.goBack}>
                <ArrowBackIosOutlined titleAccess="go back" />
              </IconButton>
            }
            rightChild={rightChild}
          />
        </Grid>
        <Grid item xs={12}>
          <CorePage sections={[{ node: <ProfileNode /> }, ...sections]} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfilePage;
