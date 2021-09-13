import React from 'react';
import { Box } from '@material-ui/core';
import baseStyles from '../../../style/styles';
import CorePage from '../../../components/CorePage';
import CategoryPaper from '../../../components/CategoryPaper';
import { Categories } from '../../../model/Categories';
import ProductsSection from '../common/ProductsGrid';
import { product } from '../../../model/ToRemove';

const categoriesPath = process.env.PUBLIC_URL + '/categories';

const CustomerHome = (): React.ReactElement => {
  const baseClasses = baseStyles();

  const CategoriesSection = () => (
    <Box className={baseClasses.horizontalScroll}>
      {Categories.map((c) => (
        <CategoryPaper
          key={c}
          name={c}
          iconPath={`${categoriesPath}/${c}.png`}
          variant="fixed"
          width="75px"
        />
      ))}
    </Box>
  );

  const sections = [
    {
      node: <CategoriesSection />,
      title: 'Categories',
    },
    {
      node: <ProductsSection clothes={[product, product, product, product]} />,
      title: 'Popular Products',
    },
  ];

  return (
    <CorePage
      title="Shopway"
      subtitle="Get popular products from local stores."
      sections={sections}
    />
  );
};

export default CustomerHome;
