import React, { useContext } from 'react';
import { Box, Grid } from '@material-ui/core';
import baseStyles from '../../../style/styles';
import CorePage from '../../../components/CorePage';
import AuthContext from '../../../hooks/useAuth';
import CategoryPaper from '../../../components/CategoryPaper';
import ProductPaper from '../../../components/ProductPaper';
import TopSection from '../../../components/TopSection';

const Categories = ['tshirt', 'jacket', 'jeans', 'shoe', 'shorts', 'swimsuit', 'clothes'];
const clothes = ['jacket', 'tshirt2', 'sweatshirt2', 'tshirt2'];

const categoriesPath = process.env.PUBLIC_URL + '/categories';
const clothesPath = process.env.PUBLIC_URL + '/clothes';

const CustomerHome = (): React.ReactElement => {
  const { user } = useContext(AuthContext);
  const baseClasses = baseStyles();

  const CategoriesSection = () => (
    <Box className={baseClasses.horizontalScroll}>
      {Categories.map((c) => (
        <CategoryPaper key={c} name={c} iconPath={`${categoriesPath}/${c}.png`} />
      ))}
    </Box>
  );

  const ProductsSection = () => (
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
    <Grid container direction="column" spacing={2}>
      <Grid item xs={12}>
        <TopSection variant="user" userName={user?.fullName} />
      </Grid>
      <Grid item xs={12}>
        <CorePage
          title="Shopway"
          subtitle="Get popular products from local stores."
          sections={sections}
        />
      </Grid>
    </Grid>
  );
};

export default CustomerHome;
