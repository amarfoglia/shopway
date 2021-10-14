import React, { useEffect, useState } from 'react';
import {
  Grid,
  makeStyles,
  IconButton,
  Theme,
  Container,
  useTheme,
  useMediaQuery,
} from '@material-ui/core';
import ArrowBackIosOutlined from '@material-ui/icons/ArrowBackIosOutlined';
import { RouteComponentProps, useHistory, useParams } from 'react-router-dom';
import TopBar from '../../../components/MobileTopBar';
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
import Routes from '../../../utils/routes';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

type State = {
  article?: Article;
  store: Store;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Props = RouteComponentProps<any, any, State | any>;

const useStyles = makeStyles<Theme, { role: string }>((theme) => ({
  container: {
    backgroundColor: theme.palette.background.default,
    minHeight: '100vh',
    [theme.breakpoints.down('xs')]: {
      padding: 0,
    },
  },
  detailsContainer: {
    [theme.breakpoints.down('xs')]: {
      paddingBottom: ({ role }) => (role === 'Customer' ? 'calc(100% - 260px)' : 'inherit'),
    },
  },
  backButton: {
    [theme.breakpoints.up('sm')]: {
      marginLeft: '5%',
    },
    [theme.breakpoints.up('md')]: {
      marginLeft: '12%',
    },
    [theme.breakpoints.up('lg')]: {
      marginLeft: '27%',
    },
  },
  details: {
    padding: theme.spacing(3),
  },
}));

const getArticle = (id: string) =>
  jsonClient.get<void, Payload<Article>>(`/articles/${id}`).then((res) => res);

const createOrder = (order: Partial<Order>) =>
  jsonClient.post<Partial<Order>, Payload<Order>>(`/orders`, order).then((res) => res);

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

const ArticlePage: React.FC<Props> = ({ location: { state } }): React.ReactElement => {
  const history = useHistory();
  const { user } = useContext(AuthContext);
  const classes = useStyles({ role: user?.role ?? 'Customer' });
  const theme = useTheme();
  const isGreaterThanXs = useMediaQuery(theme.breakpoints.up('sm'));
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Partial<Order>>({});
  const [discount, setDiscount] = useState<number>();
  const store = state && (state as State).store;

  useEffect(() => {
    !store && history.push(Routes.ERROR, { error: "Missing store's informations" });
  });

  const {
    data: articleRes,
    error: articleError,
    isLoading: isArticleLoading,
    mutate: _getArticle,
  } = useMutation<Payload<Article>, AppError, string>('getArticle', getArticle, {
    onSuccess: ({ data }) => {
      if (data?.article && user) {
        setOrder(createInitialOrder(data.article, user, store));
        setDiscount(data.article.articleDetails?.[0].discount);
      }
    },
  });

  useEffect(() => _getArticle(id), []);

  const {
    error: orderError,
    isLoading: isOrderLoading,
    mutate: _createOrder,
  } = useMutation<Payload<Order>, AppError, Partial<Order>>(createOrder, {
    onSuccess: () => history.push({ pathname: Routes.CUSTOMER_MAIN, search: 'tab=2' }),
  });

  const article = articleRes?.data?.article;

  const handleColorChange = (color: string) => {
    const articleDetails = article?.articleDetails?.find((d) => d.color === color);
    setDiscount(articleDetails?.discount);
    articleDetails &&
      setOrder({
        ...order,
        color,
        totalPrice: articleDetails.price,
        articleDetails: articleDetails._id,
      });
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
      discountPrice={discount}
      handlePriceChange={(p) => setOrder({ ...order, totalPrice: p })}
      handleClick={() => _createOrder(order)}
      isLoading={isOrderLoading}
    />
  );

  const renderContent = (article?: Article) => (
    <React.Fragment>
      <Grid container>
        <Grid item xs={12}>
          <Carousel showStatus={false} showThumbs={false} autoPlay dynamicHeight={false}>
            {article?.articleDetails
              ?.filter((d) => d.image)
              .map((a) => (
                <div key={a._id}>
                  <Image
                    src={`${BACKEND_URL}/img/articledetails/${a?.image}`}
                    alt={`product image of ${article?.name}`}
                    aspectRatio={isGreaterThanXs ? 21 / 9 : 4 / 3}
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              ))}
          </Carousel>
        </Grid>

        <Grid item xs={12} className={classes.detailsContainer}>
          <div className={classes.details}>{DetailsNode}</div>
        </Grid>
        <Grid item xs={12}>
          {user?.role === 'Customer' && QuantityNode}
        </Grid>
      </Grid>
    </React.Fragment>
  );

  const subject = user?.role === 'Customer' ? 'Customer' : 'Seller';

  return (
    <Container maxWidth="md" className={classes.container}>
      <TopBar
        variant="simple"
        position="absolute"
        subject={subject}
        leftChild={
          <div className={classes.backButton}>
            <IconButton onClick={history.goBack} style={{ padding: 0 }} aria-label="go back">
              <ArrowBackIosOutlined titleAccess="go back" fontSize="small" />
            </IconButton>
          </div>
        }
      />
      {isArticleLoading ? (
        <Loader />
      ) : articleError?.message ? (
        <ErrorDisplay text={articleError?.message} absolute />
      ) : (
        article && renderContent(article)
      )}
    </Container>
  );
};

export default ArticlePage;
