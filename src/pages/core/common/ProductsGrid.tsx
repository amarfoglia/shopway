import React from 'react';
import { Grid } from '@material-ui/core';
import ProductPaper from '../../../components/ArticlePaper';
import Article from '../../../model/article';
import Loader from '../../../components/Loader';

interface Props {
  articles?: Article[];
  isLoading: boolean;
}

const ProductsSection: React.FC<Props> = ({ articles, isLoading }) => (
  <Grid container spacing={4}>
    <Grid item xs={12}>
      {isLoading ? (
        <Loader position="relative" />
      ) : (
        <Grid container style={{ flexGrow: 1 }} spacing={2}>
          {articles?.map((a, i) => (
            <Grid item key={`${a}-${i}`} xs={6} lg={3}>
              <ProductPaper article={a} />
            </Grid>
          ))}
        </Grid>
      )}
    </Grid>
  </Grid>
);

export default ProductsSection;
