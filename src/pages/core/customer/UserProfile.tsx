import React from 'react';
import Grid from '@material-ui/core/Grid';
import ConfirmationNumber from '@material-ui/icons/ConfirmationNumber';
import Event from '@material-ui/icons/Event';
import ProfilePage from '../common/ProfilePage';
import { useParams } from 'react-router-dom';
import User from '../../../model/users/user';
import { jsonClient, Payload } from '../../../utils/axiosClient';
import Loader from '../../../components/Loader';
import { useQuery } from 'react-query';
import { AppError } from '../../../model/http';
import ErrorDisplay from '../../../components/ErrorDisplay';
import DetailPaper from '../../../components/DetailPaper';

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

const getUserInfo = (id: string) =>
  jsonClient.get<void, Payload<User>>(`/users/${id}`).then((res) => res);

const UserProfile = (): React.ReactElement => {
  const sections = [{ node: <UserDetails /> }];
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useQuery<Payload<User>, AppError>(['getUserInfo', id], () =>
    getUserInfo(id),
  );

  const user = data?.data?.user;

  return isLoading ? (
    <Loader />
  ) : error ? (
    <ErrorDisplay text={error.message} absolute />
  ) : (
    <ProfilePage
      name={user?.fullName}
      subinfo1={user?.email}
      subinfo2={user?.role}
      sections={sections}
    />
  );
};

export default UserProfile;
