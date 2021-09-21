import React from 'react';
import CorePage from '../../../../components/CorePage';
import { jsonClient, Payload } from '../../../../utils/axiosClient';
import { useQuery } from 'react-query';
import { AppError } from '../../../../model/http';
import { useContext } from 'react';
import AuthContext from '../../../../hooks/useAuth';
import Order from '../../../../model/order';
import { getStoreId } from '../../../../model/users/user';
import MyPaper from '../../../../components/MyPaper';
import { Container, Grid, IconButton, makeStyles } from '@material-ui/core';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import ArrowBackIosOutlined from '@material-ui/icons/ArrowBackIosOutlined';
import TopBar from '../../../../components/TopBar';
import Article from '../../../../model/article';

interface Stats {
  _id: string;
  numberOfOrders: number;
  profit: number;
}

const useStyles = makeStyles((theme) => ({
  container: {
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
    backgroundColor: theme.palette.background.default,
    height: '100%',
  },
}));

const getStoreStats = (id?: string) =>
  jsonClient.get<void, Payload<Stats[]>>(`/stores/${id}/stats`).then((res) => res);

const getStoreOrders = (id?: string) =>
  jsonClient.get<void, Payload<Order[]>>(`/stores/${id}/orders`).then((res) => res);

type State = {
  article: Article;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Props = RouteComponentProps<any, any, State | any>;

const ArticleDetailsPage: React.FC<Props> = ({ location: { state } }): React.ReactElement => {
  const classes = useStyles();
  const history = useHistory();
  const article = (state as State).article;

  console.log(article);

  // const { data: statsRes } = useQuery<Payload<Stats[]>, AppError>(
  //   ['getStoreStats', storeId],
  //   () => getStoreStats(storeId),
  //   { enabled: !!storeId, retry: false },
  // );

  // const { data: ordersRes } = useQuery<Payload<Order[]>, AppError>(
  //   ['getStoreOrders', storeId],
  //   () => getStoreOrders(storeId),
  //   { enabled: !!storeId, retry: false },
  // );

  // const stats = statsRes?.data?.stats;
  // const orders = ordersRes?.data?.orders;

  const ArticleSummary = () => (
    <MyPaper>
      <Grid container>
        <Grid item xs={12}>
          <Grid container justifyContent="space-between">
            <Grid item>{article.name}</Grid>
            <Grid item>{article.brand}</Grid>
          </Grid>
        </Grid>
        <Grid item></Grid>
        <Grid item></Grid>
      </Grid>
    </MyPaper>
  );

  const sections = [
    { node: <ArticleSummary />, title: 'Article summary' },
    { node: <MyPaper />, title: 'Variations' },
  ];

  return (
    <Container maxWidth="md" className={classes.container}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TopBar
            variant="simple"
            position="relative"
            p={0}
            centerTitle={'Article details'}
            leftChild={
              <IconButton onClick={history.goBack} style={{ padding: 0 }}>
                <ArrowBackIosOutlined titleAccess="go back" fontSize="small" />
              </IconButton>
            }
          />
        </Grid>
        <Grid item xs={12}>
          <CorePage sections={sections} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ArticleDetailsPage;
