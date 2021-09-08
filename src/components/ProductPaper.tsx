import React from 'react';
import { Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import Image from 'material-ui-image';
import StoreAvatar from './MyAvatar';
import { Skeleton } from '@material-ui/lab';

interface ProductProps {
  productName: string;
  price: string;
  productImage: string;
  discountPrice?: string;
  storeName: string;
  storeLogo: string;
}

const useStyles = makeStyles((theme) => ({
  productName: {
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  productPaper: {
    padding: theme.spacing(1.5),
    boxShadow: '0 5px 5px rgb(0 37 132 / 6%)',
    borderRadius: theme.spacing(2),
  },
  discount: {
    textDecorationLine: 'line-through',
    opacity: 0.8,
    marginRight: theme.spacing(1),
  },
}));

const ProductPaper: React.FC<ProductProps> = ({
  productName,
  price,
  productImage,
  discountPrice,
  storeName,
  storeLogo,
}) => {
  const classes = useStyles();

  const renderPrice = (price: string, discountPrice?: string) =>
    discountPrice ? (
      <Grid container spacing={1}>
        <Grid item>
          <Typography variant="body2" className={classes.discount}>
            ${price}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2">${discountPrice}</Typography>
        </Grid>
      </Grid>
    ) : (
      <Typography variant="body2">${price}</Typography>
    );

  return (
    <Paper className={classes.productPaper}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Grid container spacing={1} alignItems={'center'}>
            <Grid item>
              <StoreAvatar
                size={'small'}
                imagePath={storeLogo}
                text={storeName}
                alt={`logo of store ${storeName}`}
              />
            </Grid>
            <Grid item>
              <Typography variant="body2">{storeName}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Image
            src={productImage}
            alt={productName}
            loading={
              <Skeleton variant="rect" animation="wave" width={'inherit'} height={'inherit'} />
            }
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" className={classes.productName}>
            {productName}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {renderPrice(price, discountPrice)}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ProductPaper;
