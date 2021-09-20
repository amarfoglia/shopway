import React from 'react';
import CorePage from '../../../components/CorePage';
import { useHistory } from 'react-router-dom';
import { jsonClient, Payload } from '../../../utils/axiosClient';
import { useQuery } from 'react-query';
import { AppError } from '../../../model/http';
import { useContext } from 'react';
import AuthContext from '../../../hooks/useAuth';
import Seller from '../../../model/users/seller';
import {
  Fab,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Typography,
} from '@material-ui/core';
import DetailPaper from '../../../components/DetailPaper';
import ArrowUpwardOutlined from '@material-ui/icons/ArrowUpwardOutlined';
import VisibilityOutlined from '@material-ui/icons/VisibilityOutlined';
import AddOutlined from '@material-ui/icons/AddOutlined';
import ConfirmationNumberOutlined from '@material-ui/icons/ConfirmationNumberOutlined';
import MyPaper from '../../../components/MyPaper';
import Order from '../../../model/order';
import User from '../../../model/users/user';
import moment from 'moment';
import clsx from 'clsx';
import { getTimeLeft } from '../../../utils/time';

interface Stats {
  _id: string;
  numberOfOrders: number;
  profit: number;
}

const useStyles = makeStyles((theme) => ({
  orderIcon: {
    padding: theme.spacing(1.3),
    background: theme.palette.secondary.main,
    borderRadius: 30,
    marginRight: theme.spacing(0.5),
    marginTop: theme.spacing(0.5),
  },
  error: {
    backgroundColor: theme.palette.error.light,
  },
  sold: {
    backgroundColor: theme.palette.success.light,
  },
  active: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

const OrderItem: React.FC<Order> = (props) => {
  const classes = useStyles();
  const { sold, nameArticle, bookDate, totalPrice, orderExpireAt } = props;
  const timeLeft = getTimeLeft(orderExpireAt).asHours();
  const statusStyle = sold ? classes.sold : timeLeft > 0 ? classes.active : classes.error;
  return (
    <ListItem disableGutters>
      <ListItemAvatar>
        <ConfirmationNumberOutlined
          color="primary"
          className={clsx(classes.orderIcon, statusStyle)}
        />
      </ListItemAvatar>
      <ListItemText primary={nameArticle} secondary={moment(bookDate).format('D MMM, h:mm a')} />
      <ListItemSecondaryAction>
        <Typography variant="h6" component="p">
          {totalPrice}$
        </Typography>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

const getStoreStats = (id: string) =>
  jsonClient.get<void, Payload<Stats[]>>(`/stores/${id}/stats`).then((res) => res);

const getStoreOrders = (id: string) =>
  jsonClient.get<void, Payload<Order[]>>(`/stores/${id}/orders`).then((res) => res);

const getStore = (user?: User) => (user as Seller).stores[0];

const SellerHome = (): React.ReactElement => {
  const history = useHistory();
  const { user } = useContext(AuthContext);

  const { data: statsRes, isLoading } = useQuery<Payload<Stats[]>, AppError>(
    ['getStoreStats', user],
    () => getStoreStats(getStore(user)),
  );

  const { data: ordersRes, isLoading: isOrdersLoading } = useQuery<Payload<Order[]>, AppError>(
    ['getStoreOrders', user],
    () => getStoreOrders(getStore(user)),
  );

  const stats = statsRes?.data?.stats;
  const orders = ordersRes?.data?.orders;

  console.log(getStore(user), orders);

  const sections = [
    {
      node: (
        <Grid container justifyContent="space-between">
          <Grid item>
            <Typography variant="h3" component="p">
              84{' '}
              <Typography variant="subtitle1" component="span">
                articles
              </Typography>
            </Typography>
          </Grid>
          <Grid item>
            <Fab color="primary" aria-label="add" size="medium">
              <AddOutlined />
            </Fab>
          </Grid>
        </Grid>
      ),
    },
    {
      node: (
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <DetailPaper
              title={'Profits per day'}
              value={`12`}
              icon={<ArrowUpwardOutlined fontSize="small" />}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailPaper
              title={'Weekly visits'}
              value={`30`}
              icon={<VisibilityOutlined fontSize="small" />}
            />
          </Grid>
        </Grid>
      ),
    },
    {
      node: (
        <MyPaper>
          <List dense>
            {orders?.map((o) => (
              <OrderItem key={o._id} {...o} />
            ))}
          </List>
        </MyPaper>
      ),
      title: 'Reservations',
    },
  ];

  return <CorePage title="Warehouse" sections={sections} />;
};

export default SellerHome;
