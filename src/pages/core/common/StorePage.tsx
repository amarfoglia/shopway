import React from 'react';
import { Grid, IconButton } from '@material-ui/core';
import FavoriteOutlined from '@material-ui/icons/FavoriteOutlined';
import ProductPaper from '../../../components/ProductPaper';
import ProfilePage from './ProfilePage';

const clothes = ['jacket', 'tshirt2', 'sweatshirt2', 'tshirt2'];
const clothesPath = process.env.PUBLIC_URL + '/clothes';
const store = {
  storeName: 'Nike Store',
  address: 'Via Rossi, 12',
  phone: '3319822174',
};

const NewProductsSection = () => (
  <Grid container spacing={2}>
    {clothes.map((c, i) => (
      <Grid item key={`${c}-${i}`} xs={6}>
        <ProductPaper
          productName={c}
          price={'18.50'}
          discountPrice={'15.00'}
          productImage={`${clothesPath}/${c}.png`}
          storeName={'store name'}
          storeLogo={`${process.env.PUBLIC_URL}/logo192.png`}
        />
      </Grid>
    ))}
  </Grid>
);

const StorePage = (): React.ReactElement => {
  const sections = [{ title: 'New Products', node: <NewProductsSection /> }];

  return (
    <ProfilePage
      sections={sections}
      title={store.storeName}
      subtitle1={store.address}
      subtitle2={store.phone}
      rightChild={
        <IconButton>
          <FavoriteOutlined color={'primary'} titleAccess="set favority store" />
        </IconButton>
      }
    />
  );
};

export default StorePage;
