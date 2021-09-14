import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import ClearOutlined from '@material-ui/icons/ClearOutlined';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import { Collapse, makeStyles } from '@material-ui/core';
import MyPaper from '../../../components/MyPaper';

interface SearchProps {
  doOnSearch: (value: string) => void;
  isVisible?: boolean;
}

const useStyles = makeStyles((theme) => ({
  root: {
    margin: `${theme.spacing(2)}px 0px`,
  },
  searchBar: {
    '& > fieldset': {
      border: 'none',
    },
  },
}));

const SearchBar: React.FC<SearchProps> = ({ doOnSearch, isVisible = true }) => {
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
    <Collapse in={isVisible}>
      <form onSubmit={handleSubmit}>
        <MyPaper p={0}>
          <OutlinedInput
            id="input-search-article"
            fullWidth
            value={value}
            placeholder="Search the clothes you need"
            onChange={handleChange}
            className={classes.searchBar}
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
        </MyPaper>
      </form>
    </Collapse>
  );
};

export default SearchBar;
