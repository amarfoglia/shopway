import React, { useEffect, useState } from 'react';
import { Grid, makeStyles, IconButton, Theme, Container } from '@material-ui/core';
import ArrowBackIosOutlined from '@material-ui/icons/ArrowBackIosOutlined';
import { RouteComponentProps, useHistory, useParams } from 'react-router-dom';
import TopBar from '../../../components/TopBar';
import Image from 'material-ui-image';
import DetailsSection from './product/DetailSection';
import QuantitySection from './product/QuantitySection';
import Article from '../../../model/article';
import { BACKEND_URL, jsonClient, Payload } from '../../../utils/axiosClient';
import { useMutation } from 'react-query';
import { AppError } from '../../../model/http';
import Loader from '../../../components/Loader';
import ErrorDisplay from '../../../components/ErrorDisplay';
import Order from '../../../model/order';
import { useContext } from 'react';
import AuthContext from '../../../hooks/useAuth';
import Store from '../../../model/users/store';
import Customer from '../../../model/users/customer';
import User from '../../../model/users/user';
import PATHS from '../../../utils/routes';

type State = {
  article?: Article;
  store: Store;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Props = RouteComponentProps<any, any, State | any>;

const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    height: 'calc(100% - 281px)',
  },
  container: {
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
  },
}));

const getArticle = (id: string) =>
  jsonClient.get<void, Payload<Article>>(`/articles/${id}`).then((res) => res);

const createOrder = (order: Partial<Order>, id?: string) =>
  jsonClient.post<Partial<Order>, Payload<Order>>(`/users/${id}/orders`, order).then((res) => res);

const createInitialOrder = (article: Article, user: User, store: Store): Partial<Order> => {
  const details = article.articleDetails?.[0];
  const stocks = details?.stockArticles[0];
  return {
    nameArticle: article.name,
    brandArticle: article.brand,
    store: store,
    customer: user as Customer,
    totalPrice: details?.price,
    articleDetails: details?._id,
    quantity: stocks?.size ? 1 : 0,
    size: stocks?.size,
    color: details?.color,
  };
};

const ProductPage: React.FC<Props> = ({ location: { state } }): React.ReactElement => {
  const history = useHistory();
  const classes = useStyles();
  const { user } = useContext(AuthContext);
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Partial<Order>>({});
  const store = (state as State).store;

  const {
    data: articleRes,
    error: articleError,
    isLoading: isArticleLoading,
    mutate: _getArticle,
  } = useMutation<Payload<Article>, AppError, string>('getArticle', getArticle, {
    onSuccess: ({ data }) => {
      data?.article && user && setOrder(createInitialOrder(data.article, user, store));
    },
  });

  useEffect(() => _getArticle(id), []);

  const {
    error: orderError,
    isLoading: isOrderLoading,
    mutate: _createOrder,
  } = useMutation<Payload<Order>, AppError, void>(() => createOrder(order, user?._id), {
    onSuccess: () => history.push(`${PATHS.CUSTOMER_MAIN}?tab=orders`),
  });

  const article = articleRes?.data?.article;

  const handleColorChange = (color: string) => {
    const detailsId = article?.articleDetails?.find((d) => d.color === color)?._id;
    detailsId && setOrder({ ...order, color, articleDetails: detailsId });
  };

  const DetailsNode = article && (
    <DetailsSection
      article={article}
      storeName={store.name}
      storeLogo={store?.logo as string}
      handleColorChange={handleColorChange}
      handleSizeChange={(s) => setOrder({ ...order, size: s })}
      selectedSize={order?.size}
      selectedColor={order?.color}
      error={orderError?.message}
    />
  );

  const QuantityNode = (
    <QuantitySection
      quantity={order?.quantity}
      handleQuantityChange={(q) => setOrder({ ...order, quantity: q })}
      price={order?.totalPrice}
      handlePriceChange={(p) => setOrder({ ...order, totalPrice: p })}
      handleClick={_createOrder}
      isLoading={isOrderLoading}
    />
  );

  const renderContent = (article: Article) => (
    <React.Fragment>
      <div>
        <Image
          src={`${BACKEND_URL}/img/articledetails/${article?.articleDetails?.[0]?.image}`}
          alt={`product image of ${article?.name}`}
          cover
          aspectRatio={4 / 3}
        />
      </div>
      <Grid container className={classes.root}>
        <Grid item xs={12} className={classes.container}>
          {DetailsNode}
        </Grid>
      </Grid>
      {QuantityNode}
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <TopBar
        variant="simple"
        leftChild={
          <IconButton onClick={history.goBack}>
            <ArrowBackIosOutlined titleAccess="go back" fontSize="small" />
          </IconButton>
        }
      />
      {isArticleLoading ? (
        <Loader />
      ) : article ? (
        renderContent(article)
      ) : (
        <Container style={{ position: 'absolute', top: '30%' }}>
          <ErrorDisplay text={articleError?.message ?? ''} />
        </Container>
      )}
    </React.Fragment>
  );
};

export default ProductPage;
