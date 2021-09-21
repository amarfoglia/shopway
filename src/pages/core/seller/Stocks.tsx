import React, { useContext } from 'react';
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import Article from '../../../model/article';
import AuthContext from '../../../hooks/useAuth';
import { getStoreId } from '../../../model/users/user';
import { useQuery } from 'react-query';
import { jsonClient, Payload } from '../../../utils/axiosClient';
import MyPaper from '../../../components/MyPaper';
import MyAvatar from '../../../components/MyAvatar';
import CorePage from '../../../components/CorePage';
import { useHistory } from 'react-router-dom';
import PATHS from '../../../utils/routes';

const getStoreArticles = (id?: string) =>
  jsonClient.get<void, Payload<Article[]>>(`/stores/${id}/articles`).then((res) => res);

const ArticleItem: React.FC<Article> = (article) => {
  const { brand, name, articleDetails } = article;
  const history = useHistory();
  const firstDetails = articleDetails?.[0];
  const imagePath = firstDetails ? firstDetails.image : undefined;
  const quantities = articleDetails?.flatMap((d) => d.stockArticles).flatMap((s) => s.quantity);
  const quantity = quantities && quantities?.length > 0 ? quantities.reduce((p, n) => p + n) : 0;

  const goToDetailsPage = () => history.push(PATHS.ARTICLE_DETAILS_PAGE, { article });
  return (
    <ListItem onClick={goToDetailsPage}>
      <ListItemAvatar>
        <MyAvatar
          alt="Article image"
          imagePath={imagePath}
          size="large"
          subject="article"
          shape="square"
        />
      </ListItemAvatar>
      <ListItemText primary={name} secondary={brand} />
      <ListItemSecondaryAction>
        <Typography variant="subtitle2" component="p">
          Qty: {quantity}
        </Typography>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

const StocksPage: React.FC = () => {
  const { user } = useContext(AuthContext);
  const storeId = getStoreId(user);

  const { data } = useQuery<Payload<Article[]>>(
    ['getStoreStats', storeId],
    () => getStoreArticles(storeId),
    { enabled: !!storeId, retry: false },
  );

  const articles = data?.data?.articles;

  const StocksSection = () => (
    <MyPaper>
      <List dense>
        {articles && articles.length > 0 ? (
          articles.map((o) => <ArticleItem key={o._id} {...o} />)
        ) : (
          <ListItem>
            <Skeleton variant="rect" width={'100%'} height={118} />
          </ListItem>
        )}
      </List>
    </MyPaper>
  );

  const sections = [{ node: <StocksSection /> }];

  return <CorePage title="Stocks" sections={sections} />;
};

export default StocksPage;
