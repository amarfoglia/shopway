import React from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import Image from 'material-ui-image';
import StoreAvatar from './MyAvatar';
import { Skeleton } from '@material-ui/lab';
import MyPaper from './MyPaper';
import Article from '../model/article';
import { BACKEND_URL } from '../utils/axiosClient';
import { useHistory } from 'react-router-dom';
import PATHS from '../utils/routes';
import Store from '../model/users/store';

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
}));

const ArticlePaper: React.FC<ProductProps> = ({ article, hideHeader = false }) => {
  const classes = useStyles();
  const history = useHistory();
  const { store, articleDetails, name, _id: articleId } = article;
  const details = articleDetails?.[0];
  const _store = store as Store;
  const goToStorePage = () => history.push(PATHS.STORE_PAGE.replace(':id', _store?._id));
  const goToArticleDetails = () =>
    articleId && history.push(PATHS.ARTICLE_PAGE.replace(':id', articleId), { article, store });
  const renderPrice = (price = 0, discountPrice?: string) =>
    discountPrice ? (
      <Grid container>
        <Grid item>
          <Typography variant="body2" className={classes.discount}>
            ${price}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2">
            <strong>${discountPrice}</strong>
          </Typography>
        </Grid>
      </Grid>
    ) : (
      <Typography variant="body1">
        <strong>${price}</strong>
      </Typography>
    );

  return (
    <MyPaper>
      <Grid container spacing={1}>
        {!hideHeader && (
          <Grid item xs={12}>
            <Grid container spacing={1} alignItems={'center'}>
              <Grid item>
                <StoreAvatar
                  size={'small'}
                  imagePath={_store?.logo as string}
                  text={_store?.name}
                  alt={`logo of store ${_store?.name}`}
                  subject="store"
                  handleClick={goToStorePage}
                />
              </Grid>
              <Grid item>
                <Typography variant="body2">{_store?.name}</Typography>
              </Grid>
            </Grid>
          </Grid>
        )}
        <Grid item xs={12}>
          <Image
            src={`${BACKEND_URL}/img/articledetails/${details?.image}`}
            alt={name}
            loading={
              <Skeleton variant="rect" animation="wave" width={'inherit'} height={'inherit'} />
            }
            onClick={goToArticleDetails}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" className={classes.productName}>
            {article.name}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {renderPrice(details?.price, details?.discount)}
        </Grid>
      </Grid>
    </MyPaper>
  );
};

export default ArticlePaper;
