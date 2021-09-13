import React from 'react';
import { Grid } from '@material-ui/core';
import ProductPaper from '../../../components/ProductPaper';

interface Props {
  clothes: {
    productName: string;
    price: string;
    discountPrice?: string;
    productImage?: string;
    storeName: string;
    storeLogo?: string;
  }[];
}

const ProductsSection: React.FC<Props> = ({ clothes }) => (
  <Grid container style={{ flexGrow: 1 }} spacing={2}>
    {clothes.map((c, i) => (
      <Grid item key={`${c}-${i}`} xs={6}>
        <ProductPaper {...c} />
      </Grid>
    ))}
  </Grid>
);

export default ProductsSection;
