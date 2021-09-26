import React from 'react';
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Typography,
} from '@material-ui/core';
import ConfirmationNumberOutlined from '@material-ui/icons/ConfirmationNumberOutlined';
import MyPaper from '../../../../components/MyPaper';
import Order from '../../../../model/order';
import moment from 'moment';
import clsx from 'clsx';
import { getTimeLeft } from '../../../../utils/time';
import { SkeletonLoader } from '../../../../components/Loader';

const useStyles = makeStyles((theme) => ({
  orderIcon: {
    padding: theme.spacing(1.3),
    background: theme.palette.secondary.main,
    borderRadius: 30,
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
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <ConfirmationNumberOutlined
            color="primary"
            className={clsx(classes.orderIcon, statusStyle)}
          />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={nameArticle} secondary={moment(bookDate).format('D MMM, h:mm a')} />
      <ListItemSecondaryAction>
        <Typography variant="subtitle1" component="p">
          {totalPrice}$
        </Typography>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

const OrdersSection: React.FC<{ orders?: Order[] }> = ({ orders }) => {
  return (
    <MyPaper>
      {orders ? (
        <List dense>
          {orders?.map((o) => (
            <OrderItem key={o._id} {...o} />
          ))}
        </List>
      ) : (
        <SkeletonLoader />
      )}
    </MyPaper>
  );
};

export default OrdersSection;
