import React from 'react';
import { Box } from '@material-ui/core';
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
import Loader from '../../../components/Loader';

const categoriesPath = process.env.PUBLIC_URL + '/categories';

const getAllArticles = () =>
  jsonClient
    .get<void, Payload<Article[]>>(`/articles?page=1&limit=8&sort=-createdAt`)
    .then((res) => res);

const CustomerHome = (): React.ReactElement => {
  const baseClasses = baseStyles();
  const history = useHistory();

  const { data, isLoading } = useQuery<Payload<Article[]>, AppError>(
    'getAllArticles',
    getAllArticles,
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

  const ArticlesNode = () => (isLoading ? <Loader /> : <ProductsSection articles={articles} />);

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
