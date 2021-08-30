import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    minHeight: '100%',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  title: {
    fontWeight: 'bold',
  },
});

export default useStyles;
