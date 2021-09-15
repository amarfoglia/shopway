/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { makeStyles } from '@material-ui/core';

const shadow = '0 10px 30px rgba(0,37,132,.06)';

const baseStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    backgroundColor: theme.palette.background.default,
  },
  container: {
    display: 'flex',
    minHeight: '100%',
    textAlign: 'center',
    flexDirection: 'column',
  },
  horizontalScroll: {
    overflow: 'auto',
    display: 'flex',
    width: '100%',
    paddingLeft: 2,
    paddingBottom: theme.spacing(1),
    '& > div:first-child': {
      marginLeft: 0,
    },
  },
  title: {
    fontWeight: 'bold',
    textTransform: 'capitalize',
    color: theme.palette.primary.main,
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
  },
  paperPopup: {
    borderTopLeftRadius: theme.spacing(2),
    borderTopRightRadius: theme.spacing(2),
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    padding: `${theme.spacing(5)}px ${theme.spacing(4)}px`,
  },
  backFabGrid: {
    textAlign: 'left',
    paddingLeft: theme.spacing(4),
    height: 28,
  },
  photoPreview: {
    width: 100,
    height: 100,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    borderRadius: 70,
    boxShadow: shadow,
  },
}));

const roleStyles = makeStyles((theme) => ({
  imageRoleContainer: {
    borderRadius: 15,
    padding: theme.spacing(1),
    boxShadow: shadow,
    width: '25vw',
  },
  roleTitle: {
    textTransform: 'capitalize',
  },
  selectedRolePaper: {
    opacity: 1,
  },
  unselectedRolePaper: {
    opacity: 0.5,
  },
  radio: {
    display: 'none',
  },
  label: {
    margin: 0,
  },
}));

export { roleStyles, shadow };

export default baseStyles;
