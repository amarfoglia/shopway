import React, { useState } from 'react';
import { Container, Grid, IconButton, makeStyles } from '@material-ui/core';
import ArrowBackIosOutlined from '@material-ui/icons/ArrowBackIosOutlined';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import TopBar from '../../../components/TopBar';
import ProductsSection from '../common/ProductsGrid';
import SearchBar from '../../../components/SearchBar';
import AgeFilterBar from './AgeTabs';
import FilterBar from './FiltersBar';
import clsx from 'clsx';
import { jsonClient, Payload } from '../../../utils/axiosClient';
import Article from '../../../model/article';
import Pagination from '../../../components/Pagination';
import { useMutation } from 'react-query';
import { AppError } from '../../../model/http';
import ErrorDisplay from '../../../components/ErrorDisplay';
import { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
  },
  container: {
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
    backgroundColor: theme.palette.background.default,
  },
  noPadding: {
    padding: 0,
  },
}));

interface SearchParams {
  category?: string;
  subCategory: string;
  orderBy: string;
}

interface QueryParams {
  searchParams: SearchParams;
  page: number;
  text: string;
}

const limit = 8;

const getArticles = (queryParams: QueryParams) => {
  const { searchParams, text, page } = queryParams;
  const { category, subCategory, orderBy } = searchParams;
  return jsonClient
    .get<void, Payload<Article[]>>(
      `/articles?` +
        (text ? `name=${text}` : '') +
        (subCategory ? `&categoryType=${subCategory}` : '') +
        (category ? `&categoryArticle=${category}` : '') +
        (orderBy ? `&sort=${orderBy}` : '') +
        `&page=${page}&limit=${limit}`,
    )
    .then((res) => res);
};

type State = {
  category?: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Props = RouteComponentProps<any, any, State | any>;

const SearchPage: React.FC<Props> = ({ location: { state } }): React.ReactElement => {
  const history = useHistory();
  const classes = useStyles();
  const [page, setPage] = useState(1);

  const {
    data,
    error,
    isLoading,
    mutate: _getArticles,
  } = useMutation<Payload<Article[]>, AppError, QueryParams>(getArticles);

  const { category }: State = state && (state as State);
  const initParams = {
    category: category ?? '',
    subCategory: 'Man',
    orderBy: '',
  };

  const [searchParams, setSearchParams] = useState<SearchParams>(initParams);
  const [text, setText] = useState('');
  const [openSearchBar, setOpenSearchBar] = useState(true);

  useEffect(() => {
    category && _getArticles({ searchParams, text, page });
  }, []);

  const handleSearch = (text: string) => {
    setOpenSearchBar(false);
    _getArticles({ searchParams, text, page });
    setText(text);
  };

  const handleChangeParams = (params: SearchParams) => {
    _getArticles({ searchParams: params, text, page });
    setSearchParams(params);
  };

  const handlePageChange = (offset: number) => {
    setPage(page + offset);
    _getArticles({ searchParams, text, page: page + offset });
  };

  const articles = data?.data?.article;

  const renderSearchIcon = () =>
    !openSearchBar && (
      <IconButton onClick={() => setOpenSearchBar(true)} className={classes.noPadding}>
        <SearchOutlined titleAccess="search article" />
      </IconButton>
    );

  return (
    <Container maxWidth="md" className={clsx(classes.root, classes.noPadding)}>
      <Grid container>
        <Grid item xs={12}>
          <TopBar
            variant="simple"
            position="relative"
            centerTitle={'Search'}
            leftChild={
              <IconButton onClick={history.goBack} className={classes.noPadding}>
                <ArrowBackIosOutlined titleAccess="go back" fontSize="small" />
              </IconButton>
            }
            rightChild={renderSearchIcon()}
          />
        </Grid>
        <Grid item xs={12}>
          <AgeFilterBar onChange={(v) => handleChangeParams({ ...searchParams, subCategory: v })} />
        </Grid>
        <Grid item xs={12} className={classes.container}>
          <Grid container spacing={3}>
            <Grid item container xs={12} spacing={1}>
              <Grid item xs={12} style={{ paddingBlock: openSearchBar ? 'inherit' : 0 }}>
                <SearchBar doOnSearch={handleSearch} isVisible={openSearchBar} focused />
              </Grid>
              <Grid item xs={12}>
                <FilterBar
                  initCategory={category}
                  filters={{ category: searchParams.category, orderBy: searchParams.orderBy }}
                  onChange={(v) =>
                    handleChangeParams({
                      ...searchParams,
                      category: v.category,
                      orderBy: v.orderBy,
                    })
                  }
                />
              </Grid>
            </Grid>
            {error && (
              <Grid item xs={12}>
                <ErrorDisplay text={error.message} />
              </Grid>
            )}
            <Grid item xs={12}>
              <ProductsSection articles={articles} isLoading={isLoading} />
            </Grid>
            <Grid item xs={12}>
              <Pagination
                onNext={() => handlePageChange(1)}
                onPrev={() => handlePageChange(-1)}
                currentPage={page}
                limit={limit}
                numberOfItems={articles?.length ?? 0}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SearchPage;
