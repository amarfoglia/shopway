import React, { useContext } from 'react';
import {
  Grid,
  Paper,
  Avatar,
  makeStyles,
  Divider,
  Box,
  List,
  ListItemAvatar,
  ListItemText,
  ListItem,
  ListItemSecondaryAction,
  Link,
} from '@material-ui/core';
import FavoriteOutlined from '@material-ui/icons/FavoriteOutlined';
import CorePage from '../../../components/CorePage';
import AuthContext from '../../../hooks/useAuth';
import ProductPaper from '../../../components/ProductPaper';
import TopSection from '../../../components/TopSection';

const clothes = ['jacket', 'tshirt2', 'sweatshirt2', 'tshirt2'];
const clothesPath = process.env.PUBLIC_URL + '/clothes';

const useStyles = makeStyles((theme) => ({
  followContainer: {
    boxShadow: '0 5px 5px rgb(0 37 132 / 6%)',
    borderRadius: theme.spacing(2),
    textAlign: 'center',
    '& #follow-see-all-link': {
      padding: theme.spacing(1),
    },
  },
  followRow: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

const CustomerFollow = (): React.ReactElement => {
  const { user } = useContext(AuthContext);
  const classes = useStyles();

  const FollowedStoresSection = () => (
    <Paper className={classes.followContainer}>
      <List dense>
        <ListItem key="key-prova">
          <ListItemAvatar>
            <Avatar alt="Store logo" src={`${process.env.PUBLIC_URL}/logo192.png`} />
          </ListItemAvatar>
          <ListItemText primary="Store name" secondary="address" />
          <ListItemSecondaryAction>
            <FavoriteOutlined color="primary" />
          </ListItemSecondaryAction>
        </ListItem>
      </List>
      <Divider variant="middle" />
      <Box id={'follow-see-all-link'}>
        <Link>See all</Link>
      </Box>
    </Paper>
  );

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

  const sections = [
    { node: <FollowedStoresSection /> },
    {
      node: <NewProductsSection />,
      title: 'New Products',
    },
  ];

  return (
    <React.Fragment>
      <Grid container spacing={2} direction="column">
        <TopSection variant="user" userName={user?.fullName} />
        <Grid item xs={12}>
          <CorePage title="Followed" sections={sections} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default CustomerFollow;
