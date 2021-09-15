import React from 'react';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import ConfirmationNumber from '@material-ui/icons/ConfirmationNumber';
import Event from '@material-ui/icons/Event';
import ProfilePage from '../common/ProfilePage';
import MyPaper from '../../../components/MyPaper';

const user = {
  fullName: 'Mario Rossi',
  email: 'test@test.it',
  phone: '3311427793',
};

interface Props {
  title: string;
  value: string;
  icon: React.ReactNode;
}

const DetailPaper: React.FC<Props> = ({ title, value, icon }) => (
  <MyPaper style={{ padding: 10 }}>
    <Typography variant="body2" component="h6">
      {title}
    </Typography>
    <Grid item container spacing={1} alignItems="flex-end">
      <Grid item>{icon}</Grid>
      <Grid item>
        <Typography variant="h6" component="p">
          {value}
        </Typography>
      </Grid>
    </Grid>
  </MyPaper>
);

const UserDetails = () => (
  <Grid container spacing={2}>
    <Grid item xs={6}>
      <DetailPaper
        title={'Total orders'}
        value={'12'}
        icon={<ConfirmationNumber fontSize="small" />}
      />
    </Grid>
    <Grid item xs={6}>
      <DetailPaper title={'User since'} value={'2021'} icon={<Event fontSize="small" />} />
    </Grid>
  </Grid>
);

const CustomerProfile = (): React.ReactElement => {
  const sections = [{ node: <UserDetails /> }];

  return (
    <ProfilePage
      name={user.fullName}
      subinfo1={user.email}
      subinfo2={user.phone}
      sections={sections}
    />
  );
};

export default CustomerProfile;
