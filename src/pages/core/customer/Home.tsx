import React from 'react';
import { Box, Grid } from '@material-ui/core';
import baseStyles from '../../../style/styles';
import CorePage from '../../../components/CorePage';
import CategoryPaper from '../../../components/CategoryPaper';
import ProductsSection from '../common/ProductsGrid';
import { categories } from '../../../model/category';
import SearchBar from '../../../components/SearchBar';
import { useHistory } from 'react-router-dom';
import PATHS from '../../../utils/routes';
import { jsonClient, Payload } from '../../../utils/axiosClient';
import Article from '../../../model/article';
import { useQuery } from 'react-query';
import { AppError } from '../../../model/http';
import { useState } from 'react';
import Pagination from '../../../components/Pagination';

const categoriesPath = process.env.PUBLIC_URL + '/categories';
const limit = 4;

const getAllArticles = (page: number) =>
  jsonClient
    .get<void, Payload<Article[]>>(`/articles?page=${page}&limit=${limit}&sort=-createdAt`)
    .then((res) => res);

const CustomerHome = (): React.ReactElement => {
  const [page, setPage] = useState(1);
  const baseClasses = baseStyles();
  const history = useHistory();

  const { data, isLoading } = useQuery<Payload<Article[]>, AppError>(['getAllArticles', page], () =>
    getAllArticles(page),
  );

  const articles = data?.data?.article;

  const CategoriesSection = () => (
    <Box className={baseClasses.horizontalScroll}>
      {categories.map((c) => (
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

  const ArticlesNode = () => (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <ProductsSection articles={articles} isLoading={isLoading} />
      </Grid>
      <Grid item xs={12}>
        <Pagination
          onNext={() => setPage(page + 1)}
          onPrev={() => setPage(page - 1)}
          currentPage={page}
          limit={limit}
          numberOfItems={articles?.length ?? 0}
        />
      </Grid>
    </Grid>
  );

  const sections = [
    {
      node: <SearchBar handleFocus={() => history.push(PATHS.SEARCH_ARTICLE)} />,
    },
    {
      node: <CategoriesSection />,
      title: 'Categories',
    },
    {
      node: <ArticlesNode />,
      title: 'Newest Products',
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
