import React from 'react';
import { Container, Grid, IconButton, makeStyles } from '@material-ui/core';
import ArrowBackIosOutlined from '@material-ui/icons/ArrowBackIosOutlined';
import { useHistory, useParams } from 'react-router-dom';
import CorePage from '../../../components/CorePage';
import TopBar from '../../../components/TopBar';
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
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
    backgroundColor: theme.palette.background.default,
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
    <React.Fragment>
      <Container maxWidth="md" className={classes.container}>
        <TopBar
          variant="simple"
          position="relative"
          p={0}
          leftChild={
            <IconButton onClick={history.goBack} style={{ padding: 0 }}>
              <ArrowBackIosOutlined titleAccess="go back" fontSize="small" />
            </IconButton>
          }
          rightChild={rightChild}
        />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CorePage sections={[{ node: <ProfileNode /> }, ...sections]} />
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default ProfilePage;
