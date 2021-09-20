import React from 'react';
import { Grid } from '@material-ui/core';
import ProductPaper from '../../../components/ArticlePaper';
import Article from '../../../model/article';

interface Props {
  articles?: Article[];
}

const ProductsSection: React.FC<Props> = ({ articles }) => (
  <Grid container style={{ flexGrow: 1 }} spacing={2}>
    {articles?.map((a, i) => (
      <Grid item key={`${a}-${i}`} xs={6} lg={3}>
        <ProductPaper article={a} />
      </Grid>
    ))}
  </Grid>
);

export default ProductsSection;
