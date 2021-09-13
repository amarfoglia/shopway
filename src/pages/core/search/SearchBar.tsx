import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import ClearOutlined from '@material-ui/icons/ClearOutlined';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import { makeStyles } from '@material-ui/core';

interface SearchProps {
  doOnSearch: (value: string) => void;
}

const useStyles = makeStyles((theme) => ({
  root: {
    margin: `${theme.spacing(2)}px 0px`,
  },
  searchBar: {
    backgroundColor: 'white',
    borderRadius: theme.spacing(2),
  },
}));

const SearchBar: React.FC<SearchProps> = ({ doOnSearch }) => {
  const [value, setValue] = useState('');
  const classes = useStyles();

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    doOnSearch(value);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className={classes.root}>
      <OutlinedInput
        id="input-search-article"
        fullWidth
        value={value}
        placeholder="Search the clothes you need"
        className={classes.searchBar}
        onChange={handleChange}
        startAdornment={
          <InputAdornment position="start">
            <IconButton aria-label="search lens" edge="start" onClick={() => doOnSearch(value)}>
              <SearchOutlined />
            </IconButton>
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment position="end">
            {value && (
              <IconButton aria-label="remove text" edge="end" onClick={() => setValue('')}>
                <ClearOutlined fontSize="small" />
              </IconButton>
            )}
          </InputAdornment>
        }
      />
    </form>
  );
};

export default SearchBar;
