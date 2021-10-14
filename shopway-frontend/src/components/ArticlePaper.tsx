import React from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import Image from 'material-ui-image';
import StoreAvatar from './MyAvatar';
import MyPaper from './MyPaper';
import Article from '../model/article';
import { BACKEND_URL } from '../utils/axiosClient';
import { useHistory } from 'react-router-dom';
import Routes from '../utils/routes';
import Store from '../model/users/store';
import { SkeletonLoader } from './Loader';

interface ProductProps {
  article: Article;
  hideHeader?: boolean;
}

const useStyles = makeStyles((theme) => ({
  productName: {
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  discount: {
    textDecorationLine: 'line-through',
    opacity: 0.8,
    marginRight: theme.spacing(1),
  },
  pruductImageContainer: {
    minHeight: 135.5,
  },
}));

type Size = 'body1' | 'body2';

interface PriceProps {
  price?: number;
  discountPrice?: number;
  variant?: Size;
}

const PriceDisplay: React.FC<PriceProps> = ({ price = 0, discountPrice, variant = 'body2' }) => {
  const classes = useStyles();
  return discountPrice ? (
    <Grid container>
      <Grid item>
        <Typography variant={variant} className={classes.discount}>
          ${price}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant={variant}>
          <strong>${discountPrice}</strong>
        </Typography>
      </Grid>
    </Grid>
  ) : (
    <Typography variant="body1">
      <strong>${price}</strong>
    </Typography>
  );
};

export { PriceDisplay };

const ArticlePaper: React.FC<ProductProps> = ({ article, hideHeader = false }) => {
  const classes = useStyles();
  const history = useHistory();
  const { store, articleDetails, name, _id: articleId } = article;
  const details = articleDetails?.[0];
  const _store = store as Store;

  const goToStorePage = () => history.push(Routes.STORE_PAGE.replace(':id', _store?._id));

  const goToArticleDetails = () =>
    articleId && history.push(Routes.ARTICLE_PAGE.replace(':id', articleId), { article, store });

  return (
    <MyPaper>
      <Grid container spacing={1}>
        {!hideHeader && (
          <Grid item xs={12}>
            <Grid container spacing={1} alignItems={'center'} onClick={goToStorePage}>
              <Grid item>
                <StoreAvatar
                  size={'small'}
                  imagePath={_store?.logo as string}
                  text={_store?.name}
                  alt={`logo of store ${_store?.name}`}
                  subject="store"
                />
              </Grid>
              <Grid item>
                <Typography variant="body2">{_store?.name}</Typography>
              </Grid>
            </Grid>
          </Grid>
        )}
        <Grid item xs={12} className={classes.pruductImageContainer}>
          {details?.image && (
            <Image
              src={`${BACKEND_URL}/img/articledetails/${details?.image}`}
              alt={name}
              loading={<SkeletonLoader />}
              onClick={goToArticleDetails}
            />
          )}
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" className={classes.productName}>
            {article.name}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <PriceDisplay price={details?.price} discountPrice={details?.discount} />
        </Grid>
      </Grid>
    </MyPaper>
  );
};

export default ArticlePaper;
