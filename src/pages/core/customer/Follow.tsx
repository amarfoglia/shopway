import React from 'react';
import {
  // makeStyles,
  List,
  ListItemAvatar,
  ListItemText,
  ListItem,
  ListItemSecondaryAction,
  Grid,
} from '@material-ui/core';
import FavoriteOutlined from '@material-ui/icons/FavoriteOutlined';
import CorePage from '../../../components/CorePage';
import { jsonClient, Payload } from '../../../utils/axiosClient';
import { useMutation, useQuery } from 'react-query';
import { AppError } from '../../../model/http';
import Store from '../../../model/users/store';
import MyAvatar from '../../../components/MyAvatar';
import Routes from '../../../utils/routes';
import { useHistory } from 'react-router-dom';
import MyPaper from '../../../components/MyPaper';
import { SkeletonLoader } from '../../../components/Loader';
import { useState } from 'react';
import ErrorDisplay from '../../../components/ErrorDisplay';
import { useContext } from 'react';
import AuthContext from '../../../hooks/useAuth';
import User from '../../../model/users/user';
import Customer from '../../../model/users/customer';

const getFollowedStores = () =>
  jsonClient.get<void, Payload<Store[]>>(`/customers/followers`).then((res) => res);

const CustomerFollow = (): React.ReactElement => {
  const { removeFollow } = useContext(AuthContext);
  const history = useHistory();
  const [followedStores, setFollowedStores] = useState<Store[]>();

  const handleStoreDeletion = (user: Customer) =>
    setFollowedStores(followedStores?.filter((s) => user.followerList.includes(s._id)));

  const { isLoading } = useQuery<Payload<Store[]>, AppError>(
    'getFollowedStores',
    getFollowedStores,
    {
      onSuccess: ({ data }) => {
        setFollowedStores(data?.followerList);
      },
    },
  );

  const { error, mutate: _removeFollow } = useMutation<Payload<User>, AppError, string>(
    'removeFollow',
    removeFollow,
    {
      onSuccess: (data) => handleStoreDeletion(data.data?.user as Customer),
    },
  );

  const _goToStorePage = (storeId: string) =>
    history.push(Routes.STORE_PAGE.replace(':id', storeId));

  const _renderItems = () =>
    followedStores?.map((s) => (
      <ListItem key={s._id} onClick={() => _goToStorePage(s._id)}>
        <ListItemAvatar>
          <MyAvatar
            alt="Store logo"
            subject="store"
            imagePath={s.logo as string}
            size="medium"
            text={s.name}
          />
        </ListItemAvatar>
        <ListItemText primary={s.name} secondary={s.address} />
        <ListItemSecondaryAction onClick={() => _removeFollow(s._id)}>
          <FavoriteOutlined color="primary" />
        </ListItemSecondaryAction>
      </ListItem>
    ));

  const FollowedStoresSection = () => (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {error?.message && <ErrorDisplay text={error?.message} />}
        {isLoading && <SkeletonLoader />}
        {followedStores && followedStores?.length > 0 && (
          <MyPaper>
            <List dense>{isLoading ? <SkeletonLoader /> : _renderItems()}</List>
          </MyPaper>
        )}
      </Grid>
    </Grid>
  );

  const sections = [{ node: <FollowedStoresSection /> }];

  return <CorePage title="Followed" sections={sections} />;
};

export default CustomerFollow;
