import React from 'react';
import { Avatar, Box, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import Image from 'material-ui-image';
import baseStyles from '../../../style/styles';
import CorePage from '../../../components/CorePage';
import { useContext } from 'react';
import AuthContext from '../../../hooks/useAuth';
import Notifications from '@material-ui/icons/Notifications';

const useStyles = makeStyles((theme) => ({
  categoryContainer: {
    width: 90,
    height: 90,
    marginRight: theme.spacing(3),
  },
  categoryPaper: {
    padding: theme.spacing(2),
    boxShadow: '0 5px 5px rgb(0 37 132 / 6%)',
    borderRadius: 16,
    width: 70,
    textAlign: 'center',
    '& .MuiBox-root': {
      width: 30,
      margin: 'auto',
      paddingBottom: theme.spacing(1),
    },
  },
  categoryName: {
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  productPaper: {
    padding: theme.spacing(2),
    boxShadow: '0 5px 5px rgb(0 37 132 / 6%)',
    borderRadius: 16,
  },
  discount: {
    textDecorationLine: 'line-through',
    opacity: 0.8,
    marginRight: theme.spacing(1),
  },
  priceSection: {
    display: 'flex',
    flexDirection: 'row',
  },
  sectionTitle: {
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
}));

interface CateogryProps {
  value: string;
}

interface ProductProps {
  name: string;
  price: string;
  discount?: string;
}

const Categories = ['tshirt', 'jacket', 'jeans', 'shoe', 'shorts', 'swimsuit', 'clothes'];
const clothes = ['jacket', 'tshirt2', 'sweatshirt2', 'tshirt2'];

const CustomerHome = (): React.ReactElement => {
  const { user } = useContext(AuthContext);
  const classes = useStyles();
  const baseClasses = baseStyles();

  const CategoryPaper: React.FC<CateogryProps> = ({ value }) => (
    <div className={classes.categoryContainer}>
      <Paper elevation={3} className={classes.categoryPaper}>
        <Box>
          <Image src={`${process.env.PUBLIC_URL}/categories/${value}.png`} alt={value} />
        </Box>
        <Typography variant="body1" className={classes.categoryName}>
          {value}
        </Typography>
      </Paper>
    </div>
  );

  const ProductPaper: React.FC<ProductProps> = ({ name, price, discount }) => (
    <Paper elevation={3} className={classes.productPaper}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Image src={`${process.env.PUBLIC_URL}/clothes/${name}.png`} alt={name} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" className={classes.categoryName}>
            {name}
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.priceSection}>
          {discount && (
            <Typography variant="body2" className={classes.discount}>
              ${discount}
            </Typography>
          )}
          <Typography variant="body2">${price}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );

  const CategoriesSection = () => (
    <Box className={baseClasses.horizontalScroll}>
      {Categories.map((c) => (
        <CategoryPaper key={c} value={c} />
      ))}
    </Box>
  );

  const ProductsSection = () => (
    <Grid container spacing={2}>
      {clothes.map((c, i) => (
        <Grid item key={`${c}-${i}`} xs={6}>
          <ProductPaper name={c} price={'18.50'} />
        </Grid>
      ))}
    </Grid>
  );

  const sections = [
    {
      node: <CategoriesSection />,
      title: 'Categories',
    },
    {
      node: <ProductsSection />,
      title: 'Popular Products',
    },
  ];

  return (
    <React.Fragment>
      <Grid container spacing={2} direction="column">
        <Grid item xs={12}>
          <Grid
            container
            spacing={2}
            justifyContent="space-between"
            direction="row"
            alignItems="center"
          >
            <Grid item>
              <Avatar alt={user?.fullName} src={`${process.env.PUBLIC_URL}/avatar.png`} />
            </Grid>
            <Grid item>
              <Notifications style={{ fontSize: 30 }} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <CorePage
            title="Shopway"
            subtitle="Get popular products from local stores."
            sections={sections}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default CustomerHome;
