import React from 'react';
import { Container, Grid, IconButton, makeStyles } from '@material-ui/core';
import ArrowBackIosOutlined from '@material-ui/icons/ArrowBackIosOutlined';
import FavoriteOutlined from '@material-ui/icons/FavoriteOutlined';
import { useHistory, useParams } from 'react-router-dom';
import CorePage from '../../../components/CorePage';
import TopSection from '../../../components/TopSection';
import ProductPaper from '../../../components/ProductPaper';
import ProfileSection from './ProfileSections';

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

const useStyles = makeStyles((theme) => ({
  container: {
    padding: `${theme.spacing(4)}px ${theme.spacing(3)}px`,
    backgroundColor: '#f9f9f9',
  },
}));

const StorePage = (): React.ReactElement => {
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams<{ id: string }>();

  console.log(`must fetch store with id ${id}`);

  const sections = [
    {
      node: (
        <ProfileSection title={store.storeName} subtitle1={store.address} subtitle2={store.phone} />
      ),
    },
    { title: 'New Products', node: <NewProductsSection /> },
  ];

  return (
    <Container maxWidth="md" className={classes.container}>
      <Grid container spacing={2} direction="column">
        <Grid item xs={12}>
          <TopSection
            variant="simple"
            leftChild={
              <IconButton onClick={history.goBack}>
                <ArrowBackIosOutlined titleAccess="go back" />
              </IconButton>
            }
            rightChild={
              <IconButton>
                <FavoriteOutlined color={'primary'} titleAccess="set favority store" />
              </IconButton>
            }
          />
        </Grid>
        <Grid item xs={12}>
          <CorePage sections={sections} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default StorePage;
