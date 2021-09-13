import React, { useState } from 'react';
import { Box, Grid, IconButton, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import ArrowBackIosOutlined from '@material-ui/icons/ArrowBackIosOutlined';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import { useHistory } from 'react-router-dom';
import TopSection from '../../../components/TopSection';
import ProductsSection from '../common/ProductsGrid';
import { product } from '../../../model/ToRemove';
import SearchBar from './SearchBar';
import AgeFilterBar from './AgeFilterBar';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: `${theme.spacing(3)}px ${theme.spacing(3)}px`,
  },
  header: {
    backgroundColor: 'white',
    paddingBottom: 0,
  },
  content: {
    backgroundColor: '#f9f9f9',
    height: '100%',
  },
}));

interface SearchParams {
  text?: string;
  category?: string;
  sex?: string;
}

const initFilters = {
  category: '',
  sex: 'Man',
};

const SearchPage = (): React.ReactElement => {
  const history = useHistory();
  const classes = useStyles();
  const [filters, setFilters] = useState<SearchParams>(initFilters);
  const [openSearchBar, setOpenSearchBar] = useState(true);

  const handleSearch = (text: string) => {
    setOpenSearchBar(false);
    console.log(text, filters);
  };

  const renderSearchIcon = () =>
    openSearchBar ? (
      <Box />
    ) : (
      <IconButton onClick={() => setOpenSearchBar(true)} style={{ padding: 0 }}>
        <SearchOutlined titleAccess="search article" />
      </IconButton>
    );

  return (
    <Grid container>
      <Grid item className={clsx(classes.container, classes.header)} xs={12}>
        <TopSection
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
        <AgeFilterBar onChange={(sex) => setFilters({ ...filters, sex })} />
      </Grid>
      <Grid item xs={12} className={clsx(classes.container, classes.content)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {openSearchBar && <SearchBar doOnSearch={handleSearch} />}
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
