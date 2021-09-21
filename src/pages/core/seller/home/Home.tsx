import React from 'react';
import CorePage from '../../../../components/CorePage';
import { jsonClient, Payload } from '../../../../utils/axiosClient';
import { useQuery } from 'react-query';
import { AppError } from '../../../../model/http';
import { useContext } from 'react';
import AuthContext from '../../../../hooks/useAuth';
import Order from '../../../../model/order';
import { getStoreId } from '../../../../model/users/user';
import StatsSections from './StatsSection';
import OrdersSection from './OrdersSections';

interface Stats {
  _id: string;
  numberOfOrders: number;
  profit: number;
}

const getStoreStats = (id?: string) =>
  jsonClient.get<void, Payload<Stats[]>>(`/stores/${id}/stats`).then((res) => res);

const getStoreOrders = (id?: string) =>
  jsonClient.get<void, Payload<Order[]>>(`/stores/${id}/orders`).then((res) => res);

const SellerHome = (): React.ReactElement => {
  const { user } = useContext(AuthContext);
  const storeId = getStoreId(user);

  const { data: statsRes } = useQuery<Payload<Stats[]>, AppError>(
    ['getStoreStats', storeId],
    () => getStoreStats(storeId),
    { enabled: !!storeId, retry: false },
  );

  const { data: ordersRes } = useQuery<Payload<Order[]>, AppError>(
    ['getStoreOrders', storeId],
    () => getStoreOrders(storeId),
    { enabled: !!storeId, retry: false },
  );

  const stats = statsRes?.data?.stats;
  const orders = ordersRes?.data?.orders;

  const sections = [
    { node: <StatsSections stats={stats} /> },
    {
      node: <OrdersSection orders={orders} />,
      title: 'Reservations',
    },
  ];

  return <CorePage title="Warehouse" sections={sections} />;
};

export default SellerHome;
