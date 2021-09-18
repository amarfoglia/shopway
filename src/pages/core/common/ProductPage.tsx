import React, { useState } from 'react';
import { Grid, makeStyles, IconButton, Theme, Container } from '@material-ui/core';
import ArrowBackIosOutlined from '@material-ui/icons/ArrowBackIosOutlined';
import { RouteComponentProps, useHistory, useParams } from 'react-router-dom';
import TopBar from '../../../components/TopBar';
import Image from 'material-ui-image';
import DetailsSection from './product/DetailSection';
import QuantitySection from './product/QuantitySection';
import Article from '../../../model/article';
import { BACKEND_URL, jsonClient, Payload } from '../../../utils/axiosClient';
import { useMutation, useQuery } from 'react-query';
import { AppError } from '../../../model/http';
import Loader from '../../../components/Loader';
import ErrorDisplay from '../../../components/ErrorDisplay';
import Order from '../../../model/order';
import { useContext } from 'react';
import AuthContext from '../../../hooks/useAuth';
import Store from '../../../model/users/store';

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

const ProductPage: React.FC<Props> = ({ location: { state } }): React.ReactElement => {
  const history = useHistory();
  const classes = useStyles();

  const {
    data: articleRes,
    error: articleError,
    isLoading: isArticleLoading,
  } = useQuery<Payload<Article>, AppError>('getArticle', () => getArticle(id));

  const {
    data,
    error: orderError,
    isLoading: isOrderLoading,
    mutate: _createOrder,
  } = useMutation<Payload<Order>, AppError, Partial<Order>>((order: Partial<Order>) =>
    createOrder(order, user?._id),
  );

  const article = articleRes?.data?.article;
  const store = (state as State).store;

  const defaultArticle = article?.retailArticles?.[0];
  const selectedStock = article?.retailArticles?.find((a) => a.color === color)?.stockArticles;
  const availability = selectedStock?.find((s) => s.size === size)?.quantity;

  const { id } = useParams<{ id: string }>();
  const { user } = useContext(AuthContext);
  const [color, setColor] = useState(defaultArticle?.color ?? '');
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState(availability ?? 0);
  const [price, setPrice] = useState(0);

  console.log(data);

  const currentOrder: Partial<Order> = {
    nameArticle: article?.name ?? 'invalid',
    brandArticle: article?.brand ?? 'invalid',
    size: size,
    quantity: quantity,
    articleDetails: '61445518c01b547673824396',
    store: store,
  };

  const DetailsNode = article && (
    <DetailsSection
      article={article}
      storeName={store.name}
      storeLogo={store?.logo as string}
      handleColorChange={setColor}
      handleSizeChange={setSize}
      selectedSize={size}
      selectedColor={color}
      error={orderError?.message}
      stocks={selectedStock}
    />
  );

  const QuantityNode = (
    <QuantitySection
      quantity={quantity}
      handleQuantityChange={setQuantity}
      price={price}
      handlePriceChange={setPrice}
      handleClick={() => _createOrder(currentOrder)}
      isLoading={isOrderLoading}
    />
  );

  const renderContent = (article: Article) => (
    <React.Fragment>
      <div>
        <Image
          src={`${BACKEND_URL}/img/articledetails/${article?.retailArticles}`}
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
