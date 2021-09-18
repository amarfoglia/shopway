import React from 'react';
import { List, ListItem } from '@material-ui/core';
import CorePage from '../../../components/CorePage';
import OrderCard from '../../../components/OrderCard';
import { useQuery } from 'react-query';
import { AppError } from '../../../model/http';
import { jsonClient, Payload } from '../../../utils/axiosClient';
import Order from '../../../model/order';
import { useContext } from 'react';
import AuthContext from '../../../hooks/useAuth';
import Loader from '../../../components/Loader';
import ErrorDisplay from '../../../components/ErrorDisplay';

const CustomerOrders = (): React.ReactElement => {
  const { user } = useContext(AuthContext);

  const getAllOrdes = () =>
    jsonClient.get<void, Payload<Order[]>>(`/users/${user?._id}/orders`).then((res) => res);

  const { data, error, isLoading } = useQuery<Payload<Order[]>, AppError>(
    'getAllOrder',
    getAllOrdes,
  );

  const OrdersSection = () =>
    error ? (
      <ErrorDisplay text={error.message} />
    ) : isLoading ? (
      <Loader />
    ) : (
      <List disablePadding>
        {data?.data?.order.map((o) => (
          <ListItem key={o._id} disableGutters>
            <OrderCard {...o} />
          </ListItem>
        ))}
      </List>
    );

  const sections = [{ node: <OrdersSection /> }];

  return <CorePage title="Orders" sections={sections} />;
};

export default CustomerOrders;
