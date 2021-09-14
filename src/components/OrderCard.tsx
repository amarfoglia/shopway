import React from 'react';
import { Grid, makeStyles, Divider, Chip, Box } from '@material-ui/core';
import Image from 'material-ui-image';

import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import StoreAvatar from './MyAvatar';
import QueryBuilder from '@material-ui/icons/QueryBuilder';
import Skeleton from '@material-ui/lab/Skeleton';
import MyPaper from './MyPaper';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  colorSquare: {
    borderRadius: 30,
    width: 14,
    height: 14,
  },
  detail: {
    display: 'flex',
    alignItems: 'center',
  },
  cardFooter: {
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px}`,
  },
}));

type ProductDetails = {
  name: string;
  brand: string;
  size: string;
  quantity: number;
  color: string;
  imagePath: string;
};

interface OrderProps {
  storeName: string;
  timeLeft: string;
  orderDate: string;
  price: string;
  product: ProductDetails;
}

interface DetailsProps {
  details: ProductDetails;
}

type Props = {
  label: string;
  value?: string | number;
  node?: React.ReactElement;
};

const DetailItem: React.FC<Props> = ({ label, value, node }) => {
  const classes = useStyles();
  return (
    <Grid item xs={6} className={classes.detail}>
      <Typography variant="body2" style={{ color: '#757575' }}>
        {label}&nbsp;&nbsp;
      </Typography>
      {value && <Typography variant="body2">{value}</Typography>}
      {node}
    </Grid>
  );
};

const Details: React.FC<DetailsProps> = ({ details: { brand, quantity, size, color } }) => {
  const classes = useStyles();
  return (
    <Grid container alignItems="center">
      <DetailItem label="Brand" value={brand} />
      <DetailItem label="Quantity" value={quantity} />
      <DetailItem label="Size" value={size} />
      <DetailItem
        label="Color"
        node={<Box className={classes.colorSquare} style={{ backgroundColor: color }} />}
      />
    </Grid>
  );
};

const OrderCard: React.FC<OrderProps> = ({ storeName, orderDate, timeLeft, price, product }) => {
  const classes = useStyles();

  return (
    <MyPaper p={0} customStyle={classes.root}>
      <CardHeader
        avatar={<StoreAvatar text={storeName} size={'medium'} alt={`logo of store ${storeName}`} />}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={storeName}
        subheader={orderDate}
      />
      <Divider />
      <CardContent onClick={() => console.log('...')}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Image
              src={product.imagePath}
              loading={
                <Skeleton animation="wave" variant="rect" width={'inherit'} height={'inherit'} />
              }
            />
          </Grid>
          <Grid item xs={9}>
            <Grid container direction="column">
              <Grid item>
                <Typography variant="body1">
                  <b>{product.name}</b>
                </Typography>
              </Grid>
              <Grid item>{<Details details={product} />}</Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
      <Divider />
      <Box className={classes.cardFooter}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="body2">Total payment</Typography>
            <Typography variant="body1">
              <b>${price}</b>
            </Typography>
          </Grid>
          <Grid item>
            <Chip label={timeLeft} icon={<QueryBuilder />} />
          </Grid>
        </Grid>
      </Box>
    </MyPaper>
  );
};

export default OrderCard;
