import React, { useState } from 'react';
import { Grid, IconButton, makeStyles } from '@material-ui/core';
import ArrowBackIosOutlined from '@material-ui/icons/ArrowBackIosOutlined';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import { useHistory } from 'react-router-dom';
import TopBar from '../../../components/TopBar';
import ProductsSection from '../common/ProductsGrid';
import { product } from '../../../model/ToRemove';
import SearchBar from './SearchBar';
import AgeFilterBar from './AgeTabs';
import FilterBar from './FiltersBar';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: `${theme.spacing(3)}px ${theme.spacing(3)}px`,
  },
  content: {
    backgroundColor: '#f9f9f9',
    height: '100%',
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
  },
}));

interface SearchParams {
  text?: string;
  sex?: string;
  filters: {
    category: string;
    orderBy: string;
  };
}

const initParams = {
  filters: {
    category: '',
    orderBy: '',
  },
  sex: 'Man',
};

const SearchPage = (): React.ReactElement => {
  const history = useHistory();
  const classes = useStyles();
  const [searchParams, setSearchParams] = useState<SearchParams>(initParams);
  const [openSearchBar, setOpenSearchBar] = useState(true);

  const handleSearch = (text: string) => {
    setOpenSearchBar(false);
    console.log(text, searchParams);
  };

  const renderSearchIcon = () =>
    !openSearchBar && (
      <IconButton onClick={() => setOpenSearchBar(true)} style={{ padding: 0 }}>
        <SearchOutlined titleAccess="search article" />
      </IconButton>
    );

  return (
    <Grid container>
      <Grid item xs={12}>
        <TopBar
          variant="simple"
          centerTitle="Search"
          leftChild={
            <IconButton onClick={history.goBack} style={{ padding: 0 }}>
              <ArrowBackIosOutlined titleAccess="go back" fontSize="small" />
            </IconButton>
          }
          rightChild={renderSearchIcon()}
        />
      </Grid>
      <Grid item xs={12}>
        <AgeFilterBar onChange={(sex) => setSearchParams({ ...searchParams, sex })} />
      </Grid>
      <Grid item xs={12} className={classes.content}>
        <Grid container spacing={3}>
          <Grid item container xs={12} spacing={1}>
            <Grid item xs={12} style={{ paddingBlock: openSearchBar ? 'inherit' : 0 }}>
              <SearchBar doOnSearch={handleSearch} isVisible={openSearchBar} />
            </Grid>
            <Grid item xs={12}>
              <FilterBar
                filters={searchParams.filters}
                onChange={(v) => setSearchParams({ ...searchParams, filters: v })}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <ProductsSection clothes={[product, product, product, product]} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SearchPage;
