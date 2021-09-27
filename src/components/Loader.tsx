import React from 'react';
import { Box, CircularProgress, makeStyles, Theme } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

type Position = 'static' | 'relative' | 'absolute' | 'sticky' | 'fixed';

const style = makeStyles<Theme, { position: Position }>({
  pageLoader: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    position: ({ position }) => position,
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  },
});

interface Props {
  position?: Position;
}

const Loader: React.FC<Props> = ({ position = 'absolute' }) => (
  <Box className={style({ position }).pageLoader}>
    <CircularProgress thickness={5.0} />
  </Box>
);

const SkeletonLoader = (): React.ReactElement => (
  <Skeleton variant="rect" width={'100%'} height={118} />
);

export { SkeletonLoader };

export default Loader;
