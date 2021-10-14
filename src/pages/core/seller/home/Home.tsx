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
import Stats from '../../../../model/statistics';
import { useEffect } from 'react';
import { useState } from 'react';

const getStoreStats = (id?: string) =>
  jsonClient.get<void, Payload<Stats>>(`/stores/${id}/stats`).then((res) => res);

const limit = 5;
const getStoreOrders = (id?: string) =>
  jsonClient
    .get<void, Payload<Order[]>>(`/stores/${id}/orders?limit=${limit}&sort=+orderExpireAt`)
    .then((res) => res);

const SellerHome = (): React.ReactElement => {
  const { user } = useContext(AuthContext);
  const [storeId, setStoreId] = useState<string>();

  useEffect(() => user && setStoreId(getStoreId(user)), [user]);

  const { data: statsRes, isLoading: stastLoading } = useQuery<Payload<Stats>, AppError>(
    ['getStoreStats', storeId],
    () => getStoreStats(storeId),
    { enabled: !!storeId },
  );

  const { data: ordersRes, isLoading: ordersLoading } = useQuery<Payload<Order[]>, AppError>(
    ['getStoreOrders', storeId],
    () => getStoreOrders(storeId),
    { enabled: !!storeId },
  );

  const stats = statsRes?.data?.stats;
  const orders = ordersRes?.data?.orders;

  const sections = [
    { node: <StatsSections stats={stats} isLoading={stastLoading} /> },
    {
      node: <OrdersSection orders={orders} isLoading={ordersLoading} />,
      title: 'Reservations',
    },
  ];

  return <CorePage title="Warehouse" sections={sections} />;
};

export default SellerHome;
