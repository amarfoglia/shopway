import { Grid, IconButton } from '@material-ui/core';
import ArrowBackIosOutlined from '@material-ui/icons/ArrowBackIosOutlined';
import ArrowForwardIosOutlined from '@material-ui/icons/ArrowForwardIosOutlined';
import React from 'react';

interface Props {
  onNext: () => void;
  onPrev: () => void;
  currentPage: number;
  numberOfItems: number;
  limit: number;
}

const Pagination: React.FC<Props> = ({ onNext, onPrev, currentPage, numberOfItems, limit }) => {
  return (
    <Grid container justifyContent="space-between">
      <Grid item>
        {currentPage > 1 && (
          <IconButton onClick={onPrev} aria-label="Next page">
            <ArrowBackIosOutlined />
          </IconButton>
        )}
      </Grid>
      <Grid item>
        {numberOfItems === limit && (
          <IconButton onClick={onNext} aria-label="Previous page">
            <ArrowForwardIosOutlined />
          </IconButton>
        )}
      </Grid>
    </Grid>
  );
};

export default Pagination;
