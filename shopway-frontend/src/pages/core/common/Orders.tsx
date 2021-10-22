import React, { useContext, useState } from 'react';
import { Grid, Hidden, List, ListItem } from '@material-ui/core';
import CorePage from '../../../components/CorePage';
import OrderCard from '../../../components/OrderCard';
import { useMutation } from 'react-query';
import { AppError } from '../../../model/http';
import { jsonClient, Payload } from '../../../utils/axiosClient';
import Order from '../../../model/order';
import Loader from '../../../components/Loader';
import ErrorDisplay from '../../../components/ErrorDisplay';
import Pagination from '../../../components/Pagination';
import { SRole } from '../../../model/users/role';
import TimeLine from '../../../components/Timeline';
import { useEffect } from 'react';
import AuthContext from '../../../hooks/useAuth';
import Seller from '../../../model/users/seller';
import User from '../../../model/users/user';

const limit = 5;

const getAllOrders = (page: number, url: string) =>
  jsonClient
    .get<void, Payload<Order[]>>(`${url}?page=${page}&limit=${limit}&sort=+orderExpireAt`)
    .then((res) => res);

const deleteOrder = (id: string) =>
  jsonClient.delete<void, Payload<void>>(`/orders/${id}`).then((res) => res);

const confirmOrder = (id: string) =>
  jsonClient.patch<void, Payload<void>>(`/orders/${id}`).then((res) => res);

interface Props {
  role: SRole;
}

const getOrdersUrl = (user: User) =>
  user.role === 'Customer'
    ? '/customers/orders/'
    : `/stores/${(user as Seller).stores[0] ?? ''}/orders`;

const Orders: React.FC<Props> = ({ role }) => {
  const [page, setPage] = useState(1);
  const [orders, setOrders] = useState<Order[]>([]);
  const { user } = useContext(AuthContext);
  const url = user ? getOrdersUrl(user) : '';
  const {
    error: errorOnGet,
    isLoading,
    mutate: _fetchOrders,
  } = useMutation<Payload<Order[]>, AppError, number>(
    'getAllOrder',
    (page) => getAllOrders(page, url),
    {
      onSuccess: ({ data }) => data?.orders && setOrders(data.orders),
    },
  );

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    _fetchOrders(newPage);
  };

  const { error: errorOnDelete, mutate: _deleteOrder } = useMutation<
    Payload<void>,
    AppError,
    string
  >(deleteOrder);

  const { error: errorOnConfirm, mutate: _confirmOrder } = useMutation<
    Payload<void>,
    AppError,
    string
  >(confirmOrder, { onSuccess: () => _fetchOrders(page) });

  const error = (errorOnGet?.message ?? '')
    .concat(errorOnDelete?.message ?? '')
    .concat(errorOnConfirm?.message ?? '');

  useEffect(() => _fetchOrders(page), []);

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
                  handleOrderConfirm={
                    role === 'Seller' && !o.sold ? () => _confirmOrder(o._id) : undefined
                  }
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
      <Grid item xs={12} sm={7}>
        <Pagination
          onNext={() => handlePageChange(page + 1)}
          onPrev={() => handlePageChange(page - 1)}
          currentPage={page}
          limit={limit}
          numberOfItems={orders?.length ?? 0}
        />
      </Grid>
    </Grid>
  );

  const sections = [{ node: <OrdersSection /> }];

  return <CorePage title="Orders" sections={sections} />;
};

export default Orders;
