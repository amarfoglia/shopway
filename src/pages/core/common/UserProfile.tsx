import React from 'react';
import Grid from '@material-ui/core/Grid';
import FavoriteOutlined from '@material-ui/icons/FavoriteOutlined';
import Event from '@material-ui/icons/Event';
import ProfilePage from './ProfilePage';
import { useParams } from 'react-router-dom';
import User from '../../../model/users/user';
import { jsonClient, Payload } from '../../../utils/axiosClient';
import Loader from '../../../components/Loader';
import { useQuery } from 'react-query';
import { AppError } from '../../../model/http';
import ErrorDisplay from '../../../components/ErrorDisplay';
import DetailPaper from '../../../components/DetailPaper';
import moment from 'moment';
import Customer from '../../../model/users/customer';

interface Props {
  userSince?: Date;
  followedStore?: number;
}

const UserDetails: React.FC<Props> = ({ userSince, followedStore = 0 }) => (
  <Grid container spacing={2}>
    <Grid item xs={6}>
      <DetailPaper title={'Negozi seguiti'} value={followedStore} Icon={FavoriteOutlined} />
    </Grid>
    <Grid item xs={6}>
      <DetailPaper
        title={'User since'}
        value={moment(userSince).format('YYYY') ?? '-'}
        Icon={Event}
        iconColor="warning"
      />
    </Grid>
  </Grid>
);

const getUserInfo = (id: string) =>
  jsonClient.get<void, Payload<User>>(`/users/${id}`).then((res) => res);

const UserProfile = (): React.ReactElement => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useQuery<Payload<User>, AppError>(
    ['getUserInfo', id],
    () => getUserInfo(id),
    { enabled: !!id },
  );
  const user = data?.data?.user;
  const sections = [
    {
      node: (
        <UserDetails
          userSince={user?.createdAt}
          followedStore={(user as Customer)?.followerList?.length}
        />
      ),
    },
  ];

  console.log(user);

  return isLoading ? (
    <Loader />
  ) : error ? (
    <ErrorDisplay text={error.message} absolute />
  ) : (
    <ProfilePage
      name={user?.fullName}
      subinfo1={user?.email}
      subinfo2={user?.role}
      imagePath={user?.photo as string}
      subject="user"
      sections={sections}
    />
  );
};

export default UserProfile;
