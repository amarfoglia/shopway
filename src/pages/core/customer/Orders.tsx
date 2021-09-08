import React from 'react';
import { List, ListItem } from '@material-ui/core';
import CorePage from '../../../components/CorePage';
import OrderCard from '../../../components/OrderCard';

const product = {
  name: 'Tshirt',
  brand: 'nike',
  quantity: 1,
  size: 'M',
  color: 'red',
  imagePath: `${process.env.PUBLIC_URL}/clothes/tshirt.jpg`,
};

const order = {
  storeName: 'Store name',
  orderDate: 'September 14, 2016',
  timeLeft: '2 hours left',
  price: '5.00',
  product: product,
};

const CustomerOrders = (): React.ReactElement => {
  const OrdersSection = () => (
    <List disablePadding>
      <ListItem disableGutters>
        <OrderCard {...order} />
      </ListItem>
    </List>
  );

  const sections = [{ node: <OrdersSection /> }];

  return <CorePage title="Orders" sections={sections} />;
};

export default CustomerOrders;
