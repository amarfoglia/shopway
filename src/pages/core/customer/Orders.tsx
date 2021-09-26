import React from 'react';
import { List, ListItem } from '@material-ui/core';
import CorePage from '../../../components/CorePage';
import OrderCard from '../../../components/OrderCard';
import { useMutation, useQuery } from 'react-query';
import { AppError } from '../../../model/http';
import { jsonClient, Payload } from '../../../utils/axiosClient';
import Order from '../../../model/order';
import Loader from '../../../components/Loader';
import ErrorDisplay from '../../../components/ErrorDisplay';

const getAllOrdes = () =>
  jsonClient
    .get<void, Payload<Order[]>>(`/orders/?page=1&limit=5&sort=-orderExpireAt`)
    .then((res) => res);

const deleteOrder = (id: string) =>
  jsonClient.delete<void, Payload<void>>(`/orders/${id}`).then((res) => res);

const CustomerOrders = (): React.ReactElement => {
  const {
    data,
    error: errorOnGet,
    isLoading,
  } = useQuery<Payload<Order[]>, AppError>('getAllOrder', getAllOrdes);

  const { error: errorOnDelete, mutate: _deleteOrder } = useMutation<
    Payload<void>,
    AppError,
    string
  >(deleteOrder);

  const error = ''.concat(errorOnGet?.message ?? '').concat(errorOnDelete?.message ?? '');
  const orders = data?.data?.order;

  const OrdersSection = () =>
    error ? (
      <ErrorDisplay text={error} />
    ) : isLoading ? (
      <Loader />
    ) : (
      <List disablePadding>
        {orders?.map((o) => (
          <ListItem key={o._id} disableGutters>
            <OrderCard order={o} handleOrderDelete={_deleteOrder} />
          </ListItem>
        ))}
      </List>
    );

  const sections = [{ node: <OrdersSection /> }];

  return <CorePage title="Orders" sections={sections} />;
};

export default CustomerOrders;
