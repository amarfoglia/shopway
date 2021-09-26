import React from 'react';
import { Box, CircularProgress, makeStyles } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

const style = makeStyles({
  pageLoader: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  },
});

const Loader: React.FC = () => (
  <Box className={style().pageLoader}>
    <CircularProgress thickness={4.0} />
  </Box>
);

const SkeletonLoader = (): React.ReactElement => (
  <Skeleton variant="rect" width={'100%'} height={118} />
);

export { SkeletonLoader };

export default Loader;
