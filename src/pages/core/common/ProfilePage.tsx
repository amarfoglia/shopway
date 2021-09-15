import React from 'react';
import { Container, Grid, IconButton, makeStyles } from '@material-ui/core';
import ArrowBackIosOutlined from '@material-ui/icons/ArrowBackIosOutlined';
import { useHistory, useParams } from 'react-router-dom';
import CorePage from '../../../components/CorePage';
import TopBar from '../../../components/TopBar';
import ProfileSection from './ProfileSections';

interface Props {
  name?: string;
  subinfo1?: string;
  subinfo2?: string;
  topTitle?: string;
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
  name,
  subinfo1,
  subinfo2,
  rightChild,
  topTitle,
  sections,
}): React.ReactElement => {
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams<{ id: string }>();

  const ProfileNode = () => (
    <ProfileSection
      key="profile-section"
      title={name ?? ''}
      subtitle1={subinfo1}
      subtitle2={subinfo2}
    />
  );

  console.log(`must fetch resource with id ${id}`);

  return (
    <Container maxWidth="md" className={classes.container}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TopBar
            variant="simple"
            position="relative"
            p={0}
            centerTitle={topTitle}
            leftChild={
              <IconButton onClick={history.goBack} style={{ padding: 0 }}>
                <ArrowBackIosOutlined titleAccess="go back" fontSize="small" />
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
