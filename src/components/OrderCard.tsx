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
import Order from '../model/order';
import Moment from 'react-moment';
import { BACKEND_URL } from '../utils/axiosClient';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  colorSquare: {
    borderRadius: 30,
    padding: theme.spacing(0.8),
  },
  detail: {
    display: 'flex',
    alignItems: 'center',
  },
  cardFooter: {
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px}`,
  },
}));

interface DetailsProps {
  brand: string;
  size: string;
  quantity: number;
  color: string;
}

type Props = {
  label: string;
  value?: string | number;
  node?: React.ReactElement;
  alignRight?: boolean;
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

const Details: React.FC<DetailsProps> = ({ brand, quantity, size, color }) => {
  const classes = useStyles();
  return (
    <Grid container spacing={4}>
      <Grid item xs={6}>
        <Grid container>
          <Grid item xs={12}>
            <DetailItem label="Brand" value={brand} />
          </Grid>
          <Grid item xs={12}>
            <DetailItem alignRight={true} label="Size" value={size} />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={6}>
        <Grid container>
          <Grid item xs={12}>
            <DetailItem label="Quantity" value={quantity} />
          </Grid>
          <Grid item xs={12}>
            <DetailItem
              alignRight
              label="Color"
              node={<Box className={classes.colorSquare} style={{ backgroundColor: color }} />}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const OrderCard: React.FC<Order> = ({ store, articleDetails, ...order }) => {
  const classes = useStyles();

  return (
    <MyPaper p={0} customStyle={classes.root}>
      <CardHeader
        avatar={
          <StoreAvatar
            text={store?.name}
            size={'medium'}
            alt={`logo of store ${store?.name}`}
            subject="store"
            imagePath={store?.logo as string}
          />
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={store?.name}
        subheader={<Moment date={order.bookDate} format={'MMMM D, YYYY'} />}
      />
      <Divider />
      <CardContent onClick={() => console.log('...')}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Image
              src={`${BACKEND_URL}/img/articledetails/${articleDetails?.image}`}
              loading={
                <Skeleton animation="wave" variant="rect" width={'inherit'} height={'inherit'} />
              }
            />
          </Grid>
          <Grid item xs={9}>
            <Grid container direction="column">
              <Grid item>
                <Typography variant="body1">
                  <b>{order.nameArticle}</b>
                </Typography>
              </Grid>
              <Grid item>
                <Details
                  brand={order.brandArticle}
                  color={articleDetails?.color}
                  quantity={order.quantity}
                  size={order.size}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
      <Divider />
      <Box className={classes.cardFooter}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item xs={6}>
            <Typography variant="body2">Total payment</Typography>
            <Typography variant="body1">
              <b>${articleDetails?.price}</b>
            </Typography>
          </Grid>
          <Grid item xs={6} style={{ textAlign: 'right' }}>
            <Chip
              label={
                <Typography component="span" variant="body2">
                  <Moment date={order.orderExpireAt} duration={new Date()} format="hh" /> hours left
                </Typography>
              }
              icon={<QueryBuilder />}
            />
          </Grid>
        </Grid>
      </Box>
    </MyPaper>
  );
};

export default OrderCard;
