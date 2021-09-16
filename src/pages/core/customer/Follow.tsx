import React from 'react';
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
import ProductPaper from '../../../components/ProductPaper';

const clothes = ['jacket', 'tshirt2', 'sweatshirt2', 'tshirt2'];
const clothesPath = process.env.PUBLIC_URL + '/clothes';

const useStyles = makeStyles((theme) => ({
  followContainer: {
    boxShadow: '0 0 15px 2px #efefef',
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
            storeLogo={`logo192.png`}
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

  return <CorePage title="Followed" sections={sections} />;
};

export default CustomerFollow;
