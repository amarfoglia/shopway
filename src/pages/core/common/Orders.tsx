import React, { useState } from 'react';
import { Grid, Hidden, List, ListItem } from '@material-ui/core';
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
import TimeLine from '../../../components/Timeline';
import { useEffect } from 'react';

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
  const [orders, setOrders] = useState<Order[]>([]);
  const {
    data,
    error: errorOnGet,
    isLoading,
  } = useQuery<Payload<Order[]>, AppError>(['getAllOrder', page], () => getAllOrdes(page));

  const _updateOrders = (data: Payload<Order[]> | undefined) => {
    const newOrders = data?.data?.order;
    newOrders && setOrders(newOrders);
  };

  const { error: errorOnDelete, mutate: _deleteOrder } = useMutation<
    Payload<void>,
    AppError,
    string
  >(deleteOrder);

  const error = ''.concat(errorOnGet?.message ?? '').concat(errorOnDelete?.message ?? '');
  useEffect(() => _updateOrders(data), [data]);

  const OrdersSection = () => (
    <Grid container spacing={1}>
      {error && (
        <Grid item xs={12}>
          <ErrorDisplay text={error} />
        </Grid>
      )}
      {orders && (
        <Hidden xsDown>
          <Grid item xs={12} sm={5}>
            <TimeLine
              values={orders.flatMap((o) => ({
                label: o.customer?.fullName ?? o.brandArticle,
                startDate: o.bookDate,
                endDate: o.orderExpireAt,
              }))}
            />
          </Grid>
        </Hidden>
      )}
      <Grid item xs={12} sm={7}>
        {isLoading ? (
          <Loader />
        ) : (
          <List disablePadding>
            {orders?.map((o) => (
              <ListItem key={o._id} disableGutters>
                <OrderCard
                  order={o}
                  handleOrderDelete={(id) => {
                    _deleteOrder(id);
                    setOrders(orders.filter((o) => o._id !== id));
                  }}
                  subject={role}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Grid>
      <Hidden xsDown>
        <Grid item sm={5}></Grid>
      </Hidden>
      {orders && orders?.length > 0 && (
        <Grid item xs={12} sm={7}>
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
