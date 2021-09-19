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

const getAllOrdes = (id?: string) =>
  jsonClient.get<void, Payload<Order[]>>(`/users/${id}/orders`).then((res) => res);

const CustomerOrders = (): React.ReactElement => {
  const { user } = useContext(AuthContext);

  const { data, error, isLoading } = useQuery<Payload<Order[]>, AppError>(
    ['getAllOrder', user?._id],
    () => getAllOrdes(user?._id),
  );

  const orders = data?.data?.order;

  const OrdersSection = () =>
    error ? (
      <ErrorDisplay text={error.message} />
    ) : isLoading ? (
      <Loader />
    ) : (
      <List disablePadding>
        {orders?.map((o) => (
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
