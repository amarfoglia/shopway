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
import Seller from '../../../model/users/seller';
import User from '../../../model/users/user';

const getStore = (user?: User) => (user as Seller).stores[0];

const getAllOrdes = (storeId: string) =>
  jsonClient.get<void, Payload<Order[]>>(`stores/${storeId}/orders`).then((res) => res);

const SellerOrders = (): React.ReactElement => {
  const { user } = useContext(AuthContext);

  const { data, error, isLoading } = useQuery<Payload<Order[]>, AppError>(
    ['getAllOrder', user],
    () => getAllOrdes(getStore(user)),
  );

  const orders = data?.data?.orders;

  const OrdersSection = () =>
    error ? (
      <ErrorDisplay text={error.message} />
    ) : isLoading ? (
      <Loader />
    ) : (
      <List disablePadding>
        {orders?.map((o) => (
          <ListItem key={o._id} disableGutters>
            <OrderCard order={o} subject="seller" />
          </ListItem>
        ))}
      </List>
    );

  const sections = [{ node: <OrdersSection /> }];

  return <CorePage title="Orders" sections={sections} />;
};

export default SellerOrders;
