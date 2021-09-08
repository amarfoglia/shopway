import React from 'react';
import { Container, Grid, IconButton, makeStyles, Typography } from '@material-ui/core';
import ArrowBackIosOutlined from '@material-ui/icons/ArrowBackIosOutlined';
import FavoriteOutlined from '@material-ui/icons/FavoriteOutlined';
// import RoomOutlined from '@material-ui/icons/RoomOutlined';
// import PhoneOutlined from '@material-ui/icons/PhoneOutlined';
import { useHistory } from 'react-router-dom';
import CorePage from '../../../components/CorePage';
import TopSection from '../../../components/TopSection';
import ProductPaper from '../../../components/ProductPaper';
import MyAvatar from '../../../components/MyAvatar';

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

interface Props {
  storeName: string;
  address: string;
  phone: string;
}

const ProfileSection: React.FC<Props> = ({ storeName, address, phone }) => (
  <Grid container direction="column" alignItems="center" spacing={1}>
    <Grid item xs={12}>
      <MyAvatar size="xl" alt={'store logo'} text={storeName} />
    </Grid>
    <Grid item xs={12}>
      <Typography variant="h5">{storeName}</Typography>
    </Grid>
    <Grid item xs={12}>
      <Typography variant="body1">
        {/* <RoomOutlined fontSize="small" /> */}
        {address}
      </Typography>
    </Grid>
    <Grid item>
      <Typography variant="body2">
        {/* <PhoneOutlined fontSize="small" /> */}
        {phone}
      </Typography>
    </Grid>
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
  const sections = [
    { node: <ProfileSection {...store} /> },
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
                <ArrowBackIosOutlined />
              </IconButton>
            }
            rightChild={
              <IconButton>
                <FavoriteOutlined color={'primary'} />
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
