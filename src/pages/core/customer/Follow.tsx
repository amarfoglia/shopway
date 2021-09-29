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

const getFollowedStores = () =>
  jsonClient.get<void, Payload<Store[]>>(`/customers/followers`).then((res) => res);

const patchFollow = (follows: string[]) =>
  jsonClient.patch<string[], Payload<Store[]>>(`/customers/followers`, follows).then((res) => res);

const toStoresId = (stores?: Store[]) => stores?.flatMap((s) => s._id) ?? [];

const CustomerFollow = (): React.ReactElement => {
  const history = useHistory();
  const [followedStores, setFollowedStores] = useState<Store[]>();

  const { isLoading } = useQuery<Payload<Store[]>, AppError>(
    'getFollowedStores',
    getFollowedStores,
    {
      onSuccess: ({ data }) => {
        setFollowedStores(data?.followerList);
      },
    },
  );

  const { error, mutate: _patchFollow } = useMutation<Payload<Store[]>, AppError, string[]>(
    'patchFollow',
    patchFollow,
    { onSuccess: (data) => setFollowedStores(data.data?.followerList) },
  );

  const handleFollowRemove = (storeIdToRemove: string) => {
    const storesId = toStoresId(followedStores);
    !!storesId &&
      storesId.length > 0 &&
      _patchFollow(toStoresId(followedStores?.filter((s) => s._id !== storeIdToRemove)));
  };

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
        <ListItemSecondaryAction onClick={() => handleFollowRemove(s._id)}>
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
