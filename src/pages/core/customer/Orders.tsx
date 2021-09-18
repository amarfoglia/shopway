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
import AlertTitle from '@material-ui/lab/AlertTitle';
import Alert from '@material-ui/lab/Alert';
import Loader from '../../../components/Loader';

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
      renderErrors(error.message)
    ) : isLoading ? (
      <Loader />
    ) : (
      <List disablePadding>
        <ListItem disableGutters>
          {data?.data?.order.map((o) => (
            <OrderCard key={o._id} {...o} />
          ))}
        </ListItem>
      </List>
    );

  const renderErrors = (errors: string) => (
    <Alert severity="error" style={{ textAlign: 'left', borderRadius: 16 }}>
      <AlertTitle>Error</AlertTitle>
      {errors}
    </Alert>
  );

  const sections = [{ node: <OrdersSection /> }];

  return <CorePage title="Orders" sections={sections} />;
};

export default CustomerOrders;
