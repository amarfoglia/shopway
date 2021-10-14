import React from 'react';
import { Grid, IconButton } from '@material-ui/core';
import FavoriteOutlined from '@material-ui/icons/FavoriteOutlined';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import ProductPaper from '../../../components/ArticlePaper';
import ProfilePage from './ProfilePage';
import { jsonClient, Payload } from '../../../utils/axiosClient';
import Article from '../../../model/article';
import { AppError } from '../../../model/http';
import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Store from '../../../model/users/store';
import Loader from '../../../components/Loader';
import { useContext } from 'react';
import AuthContext from '../../../hooks/useAuth';
import Customer from '../../../model/users/customer';
import { useState } from 'react';
import { useEffect } from 'react';
import User from '../../../model/users/user';

const getStoreArticles = (id: string) =>
  jsonClient.get<void, Payload<Article[]>>(`/stores/${id}/mostpopulararticles`).then((res) => res);

const getStore = (id: string) =>
  jsonClient.get<void, Payload<Store>>(`/stores/${id}`).then((res) => res);

const StorePage = (): React.ReactElement => {
  const { id } = useParams<{ id: string }>();
  const [isFollowed, setIsFollowed] = useState<boolean>();
  const { user, removeFollow, addFollow } = useContext(AuthContext);

  const { data: articlesRes, isLoading } = useQuery<Payload<Article[]>, AppError>(
    ['getStoreArticles', id],
    () => getStoreArticles(id),
  );

  const { data: storeRes } = useQuery<Payload<Store>, AppError>(['getStore', id], () =>
    getStore(id),
  );

  const { mutate: _removeFollow } = useMutation<Payload<User>, AppError, string>(
    'removeFollow',
    removeFollow,
  );

  const { mutate: _addFollow } = useMutation<Payload<User>, AppError, string>(
    'addFollow',
    addFollow,
  );

  const store = storeRes?.data?.store;
  const articles = articlesRes?.data?.articles;

  useEffect(() => {
    const followerList: string[] = (user as Customer).followerList;
    const follow = (store && followerList?.includes(store._id)) ?? false;
    setIsFollowed(follow);
  }, [user, store]);

  const PopularProductsSection = () => (
    <Grid container spacing={2}>
      {isLoading ? (
        <Loader />
      ) : (
        articles?.map((a, i) => (
          <Grid item key={`${a}-${i}`} xs={6}>
            <ProductPaper article={a} hideHeader />
          </Grid>
        ))
      )}
    </Grid>
  );

  const sections = articles
    ? [{ title: 'Popular products', node: <PopularProductsSection /> }]
    : [];

  return (
    <ProfilePage
      sections={sections}
      imagePath={store?.logo as string}
      name={store?.name}
      subinfo1={store?.address}
      subinfo2={store?.phone}
      subject="store"
      rightChild={
        isFollowed ? (
          <IconButton onClick={() => store?._id && _removeFollow(store?._id)}>
            <FavoriteOutlined color={'primary'} titleAccess="unfollow store" />
          </IconButton>
        ) : (
          <IconButton onClick={() => store?._id && _addFollow(store?._id)}>
            <FavoriteBorder color={'primary'} titleAccess="follow store" />
          </IconButton>
        )
      }
    />
  );
};

export default StorePage;
