import React from 'react';
import { Grid, IconButton } from '@material-ui/core';
import FavoriteOutlined from '@material-ui/icons/FavoriteOutlined';
import ProductPaper from '../../../components/ArticlePaper';
import ProfilePage from './ProfilePage';
import { jsonClient, Payload } from '../../../utils/axiosClient';
import Article from '../../../model/article';
import { AppError } from '../../../model/http';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Store from '../../../model/users/store';
import Loader from '../../../components/Loader';

const getStoreArticles = (id: string) =>
  jsonClient.get<void, Payload<Article[]>>(`/stores/${id}/articles`).then((res) => res);

const getStore = (id: string) =>
  jsonClient.get<void, Payload<Store>>(`/stores/${id}`).then((res) => res);

const StorePage = (): React.ReactElement => {
  const { id } = useParams<{ id: string }>();

  const { data: articlesRes, isLoading } = useQuery<Payload<Article[]>, AppError>(
    ['getStoreArticles', id],
    () => getStoreArticles(id),
  );

  const { data: storeRes } = useQuery<Payload<Store>, AppError>(['getStore', id], () =>
    getStore(id),
  );

  const store = storeRes?.data?.store;
  const articles = articlesRes?.data?.article;

  const NewProductsSection = () => (
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

  const sections = [{ title: 'Store products', node: <NewProductsSection /> }];

  return (
    <ProfilePage
      sections={sections}
      imagePath={store?.logo as string}
      name={store?.name}
      subinfo1={store?.address}
      subinfo2={store?.phone}
      rightChild={
        <IconButton>
          <FavoriteOutlined color={'primary'} titleAccess="set favority store" />
        </IconButton>
      }
    />
  );
};

export default StorePage;
