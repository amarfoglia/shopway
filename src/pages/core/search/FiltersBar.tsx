import React, { useState } from 'react';
import { Button, Grid } from '@material-ui/core';
import MyPaper from '../../../components/MyPaper';
import TuneOutlined from '@material-ui/icons/TuneOutlined';
import CategoryOutlined from '@material-ui/icons/CategoryOutlined';
import { Categories } from '../../../model/Categories';
import Popover from '../../../components/PopOver';

const orderByItems = ['Popolari', 'Novità', 'Prezzo: Alto-Basso', 'Prezzo: Basso-Alto'];

type FilterParams = {
  category: string;
  orderBy: string;
};

interface Props {
  filters: FilterParams;
  onChange: (v: FilterParams) => void;
}

const FilterBar: React.FC<Props> = ({ filters, onChange }): React.ReactElement => {
  const [orderBy, setOrderBy] = useState(-1);
  const [category, setCategory] = useState(-1);
  const resetFilters = () => {
    setOrderBy(-1);
    setCategory(-1);
    onChange({ orderBy: '', category: '' });
  };

  const handleOrderByChange = (v: string, index: number) => {
    setOrderBy(index);
    onChange({ ...filters, orderBy: v });
  };

  const handleCategoryChange = (v: string, index: number) => {
    setCategory(index);
    onChange({ ...filters, category: v });
  };

  return (
    <Grid container justifyContent="flex-start" spacing={1} alignItems="center">
      <Grid item>
        <MyPaper p={0}>
          <Popover
            selectedItem={orderBy}
            Icon={TuneOutlined}
            label={'order by'}
            id={'order-by-button'}
            items={orderByItems}
            onChange={handleOrderByChange}
          />
        </MyPaper>
      </Grid>
      <Grid item>
        <MyPaper p={0}>
          <Popover
            selectedItem={category}
            Icon={CategoryOutlined}
            label={'filter by category'}
            id={'category-filter-button'}
            items={Categories}
            onChange={handleCategoryChange}
          />
        </MyPaper>
      </Grid>
      <Grid item>
        {(filters.category || filters.orderBy) && (
          <Button variant="outlined" onClick={resetFilters}>
            Reset
          </Button>
        )}
      </Grid>
    </Grid>
  );
};

export default FilterBar;
