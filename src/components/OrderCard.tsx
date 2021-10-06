import React from 'react';
import { Grid, makeStyles, Divider, Chip, Box, Theme } from '@material-ui/core';

import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MyAvatar from './MyAvatar';
import QueryBuilder from '@material-ui/icons/QueryBuilder';
import MyPaper from './MyPaper';
import Order from '../model/order';
import Moment from 'react-moment';
import { useHistory } from 'react-router-dom';
import Routes from '../utils/routes';
import { ArticleDetails } from '../model/article';
import { getTimeLeft } from '../utils/time';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';
import { SRole } from '../model/users/role';
import TicketVisualizer from './Ticket';

type Props = {
  label: string;
  value?: string | number;
  node?: React.ReactElement;
  alignRight?: boolean;
};

const useItemStyles = makeStyles({
  detail: {
    display: 'flex',
    alignItems: 'center',
  },
});

const DetailItem: React.FC<Props> = ({ label, value, node }) => {
  const classes = useItemStyles();
  return (
    <Grid item className={classes.detail}>
      <Typography variant="caption" color="textSecondary">
        {label}&nbsp;&nbsp;
      </Typography>
      {value && <Typography variant="body2">{value}</Typography>}
      {node}
    </Grid>
  );
};

const useDetailStyles = makeStyles<Theme, { color: string }>((theme) => ({
  colorSquare: {
    borderRadius: 30,
    padding: theme.spacing(0.8),
    backgroundColor: (props) => props.color,
  },
}));

interface DetailsProps {
  brand: string;
  size: string;
  quantity: number;
  color: string;
}

const Details: React.FC<DetailsProps> = ({ brand, quantity, size, color }) => {
  const classes = useDetailStyles({ color });
  return (
    <Grid container spacing={2}>
      <Grid item xs={7}>
        <Grid container>
          <Grid item xs={12}>
            <DetailItem label="Brand" value={brand} />
          </Grid>
          <Grid item xs={12}>
            <DetailItem alignRight={true} label="Size" value={size} />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={5}>
        <Grid container>
          <Grid item xs={12}>
            <DetailItem label="Quantity" value={quantity} />
          </Grid>
          <Grid item xs={12}>
            <DetailItem alignRight label="Color" node={<Box className={classes.colorSquare} />} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

type StyleProps = {
  timeLeft: number;
  sold: boolean;
};

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  root: {
    width: '100%',
  },
  cardFooter: {
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px}`,
  },
  timeLeftChip: {
    backgroundColor: (props) =>
      props.sold
        ? theme.palette.success.light
        : props.timeLeft > 0
        ? theme.palette.secondary.main
        : theme.palette.error.light,
  },
}));

interface CardProps {
  order: Order;
  subject?: SRole;
  handleOrderDelete?: (orderId: string) => void;
}

const OrderCard: React.FC<CardProps> = ({
  order: { store, articleDetails, ...order },
  subject = 'Customer',
  handleOrderDelete,
}) => {
  const timeLeft = getTimeLeft(order.orderExpireAt).asHours();
  const classes = useStyles({ timeLeft, sold: order.sold });
  const history = useHistory();
  const details = articleDetails as ArticleDetails;
  const customer = order.customer;
  const goToArticlePage = () =>
    history.push(Routes.ARTICLE_PAGE.replace(':id', details.articleId), {
      store,
    });

  const isCustomer = subject === 'Customer';
  const goToStorePage = () =>
    store?._id && history.push(Routes.STORE_PAGE.replace(':id', store._id));
  const goToCustomerPage = () =>
    customer?._id && history.push(Routes.CUSTOMER_PROFILE.replace(':id', customer._id));

  type CardHeaderInfo = {
    name?: string;
    goToPage: () => void;
    bookDate: Date;
    imagePath: string;
  };

  const renderCardHeader: React.FC<CardHeaderInfo> = ({ name, goToPage, bookDate, imagePath }) => (
    <CardHeader
      avatar={
        <MyAvatar
          text={name}
          size={'medium'}
          alt={`logo of ${name}`}
          subject={isCustomer ? 'user' : 'store'}
          imagePath={imagePath}
          handleClick={goToPage}
        />
      }
      action={
        <div>
          {handleOrderDelete && (
            <IconButton onClick={() => order._id && handleOrderDelete(order._id)}>
              <DeleteOutlined titleAccess="delete stock" fontSize="medium" color="error" />
            </IconButton>
          )}
          <TicketVisualizer
            code={order.code}
            subInfo={`${order.totalPrice}$`}
            validFrom={order.bookDate}
            validTo={order.orderExpireAt}
          />
        </div>
      }
      title={name}
      subheader={<Moment date={bookDate} format={'MMMM D, YYYY'} />}
    />
  );

  return (
    <MyPaper p={0} customStyle={classes.root}>
      {renderCardHeader({
        name: isCustomer ? store.name : customer?.fullName,
        imagePath: isCustomer ? (store.logo as string) : (customer?.photo as string),
        goToPage: isCustomer ? goToStorePage : goToCustomerPage,
        bookDate: order.bookDate,
      })}
      <Divider />
      <CardContent onClick={goToArticlePage}>
        <Grid container spacing={2}>
          <Grid item xs={3} style={{ display: 'flex' }}>
            <Grid container justifyContent="center" alignItems="center">
              <MyAvatar
                imagePath={details?.image as string}
                size="fullWidth"
                subject="articledetail"
                shape="square"
                alt={`image of article ${details.articleId}`}
              />
            </Grid>
          </Grid>
          <Grid item xs={9}>
            <Grid container direction="column" spacing={1}>
              <Grid item>
                <Typography variant="body1">
                  <b>{order.nameArticle}</b>
                </Typography>
              </Grid>
              <Grid item>
                <Details
                  brand={order.brandArticle}
                  color={details?.color}
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
              <b>${details?.price}</b>
            </Typography>
          </Grid>
          <Grid item xs={6} style={{ textAlign: 'right' }}>
            <Chip
              className={classes.timeLeftChip}
              label={
                <div>
                  <Typography component="span" variant="body2" gutterBottom>
                    {order.sold
                      ? 'Completed'
                      : timeLeft > 0
                      ? `${timeLeft.toFixed(0)} hours left`
                      : 'Expired'}
                  </Typography>
                </div>
              }
              icon={<QueryBuilder style={{ color: 'black' }} fontSize="small" />}
            />
          </Grid>
        </Grid>
      </Box>
    </MyPaper>
  );
};

export default OrderCard;
