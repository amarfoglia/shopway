import React, { useContext } from 'react';
import {
  Fab,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from '@material-ui/core';
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
import AddOutlined from '@material-ui/icons/AddOutlined';

const getStoreArticles = (id?: string) =>
  jsonClient.get<void, Payload<Article[]>>(`/stores/${id}/articles`).then((res) => res);

const ArticleItem: React.FC<Article> = (article) => {
  const { brand, name, articleDetails } = article;
  const history = useHistory();
  const firstDetails = articleDetails?.[0];
  const imagePath = firstDetails ? firstDetails.image : undefined;
  const quantities = articleDetails?.flatMap((d) => d.stockArticles).flatMap((s) => s.quantity);
  const quantity = quantities && quantities?.length > 0 ? quantities.reduce((p, n) => p + n, 0) : 0;

  const goToDetailsPage = () =>
    article._id &&
    history.push(PATHS.ARTICLE_DETAILS_PAGE.replace(':id', article._id), { article });
  return (
    <ListItem onClick={goToDetailsPage}>
      <ListItemAvatar>
        <MyAvatar
          alt="Article image"
          imagePath={imagePath as string}
          size="large"
          subject="articledetail"
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
    { enabled: !!storeId },
  );

  const articles = data?.data?.articles;

  const StocksSection = () => (
    <MyPaper>
      <List dense>
        {articles && articles.length > 0 && articles.map((o) => <ArticleItem key={o._id} {...o} />)}
      </List>
    </MyPaper>
  );

  const StockButton = () => {
    const history = useHistory();
    return (
      <div style={{ textAlign: 'right' }}>
        <Fab
          color="primary"
          aria-label="add"
          size="medium"
          onClick={() => history.push(PATHS.ARTICLE_FORM)}
        >
          <AddOutlined />
        </Fab>
      </div>
    );
  };

  const sections = [{ node: <StocksSection /> }, { node: <StockButton /> }];

  return <CorePage title="Stocks" sections={sections} />;
};

export default StocksPage;
