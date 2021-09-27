import React, { useState } from 'react';
import { Grid, List, ListItem } from '@material-ui/core';
import CorePage from '../../../components/CorePage';
import OrderCard from '../../../components/OrderCard';
import { useMutation, useQuery } from 'react-query';
import { AppError } from '../../../model/http';
import { jsonClient, Payload } from '../../../utils/axiosClient';
import Order from '../../../model/order';
import Loader from '../../../components/Loader';
import ErrorDisplay from '../../../components/ErrorDisplay';
import Pagination from '../../../components/Pagination';
import { SRole } from '../../../model/users/role';

const limit = 5;

const getAllOrdes = (page: number) =>
  jsonClient
    .get<void, Payload<Order[]>>(`/orders/?page=${page}&limit=${limit}&sort=+orderExpireAt`)
    .then((res) => res);

const deleteOrder = (id: string) =>
  jsonClient.delete<void, Payload<void>>(`/orders/${id}`).then((res) => res);

interface Props {
  role: SRole;
}

const Orders: React.FC<Props> = ({ role }) => {
  const [page, setPage] = useState(1);
  const {
    data,
    error: errorOnGet,
    isLoading,
  } = useQuery<Payload<Order[]>, AppError>(['getAllOrder', page], () => getAllOrdes(page));

  const { error: errorOnDelete, mutate: _deleteOrder } = useMutation<
    Payload<void>,
    AppError,
    string
  >(deleteOrder);

  const error = ''.concat(errorOnGet?.message ?? '').concat(errorOnDelete?.message ?? '');
  const orders = data?.data?.order;

  const OrdersSection = () => (
    <Grid container spacing={1}>
      {error && (
        <Grid item xs={12}>
          <ErrorDisplay text={error} />
        </Grid>
      )}
      <Grid item xs={12}>
        {isLoading ? (
          <Loader />
        ) : (
          <List disablePadding>
            {orders?.map((o) => (
              <ListItem key={o._id} disableGutters>
                <OrderCard order={o} handleOrderDelete={_deleteOrder} subject={role} />
              </ListItem>
            ))}
          </List>
        )}
      </Grid>
      {orders && orders?.length > 0 && (
        <Grid item xs={12}>
          <Pagination
            onNext={() => setPage(page + 1)}
            onPrev={() => setPage(page - 1)}
            currentPage={page}
            limit={limit}
            numberOfItems={orders?.length ?? 0}
          />
        </Grid>
      )}
    </Grid>
  );

  const sections = [{ node: <OrdersSection /> }];

  return <CorePage title="Orders" sections={sections} />;
};

export default Orders;
