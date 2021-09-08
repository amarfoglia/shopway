import React, { useContext } from 'react';
import { Grid, List, ListItem } from '@material-ui/core';
import CorePage from '../../../components/CorePage';
import AuthContext from '../../../hooks/useAuth';
import TopSection from '../../../components/TopSection';
import OrderCard from '../../../components/OrderCard';

const product = {
  name: 'Tshirt',
  brand: 'nike',
  quantity: 1,
  size: 'M',
  color: 'red',
  imagePath: `${process.env.PUBLIC_URL}/clothes/tshirt1.png`,
};

const order = {
  storeName: 'Store name',
  orderDate: 'September 14, 2016',
  timeLeft: '2 hours left',
  price: '5.00',
  product: product,
};

const CustomerOrders = (): React.ReactElement => {
  const { user } = useContext(AuthContext);

  const OrdersSection = () => (
    <List disablePadding>
      <ListItem disableGutters>
        <OrderCard {...order} />
      </ListItem>
    </List>
  );

  const sections = [{ node: <OrdersSection /> }];

  return (
    <React.Fragment>
      <Grid container spacing={2} direction="column">
        <Grid item xs={12}>
          <TopSection variant="user" userName={user?.fullName} />
        </Grid>
        <Grid item xs={12}>
          <CorePage title="Orders" sections={sections} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default CustomerOrders;
