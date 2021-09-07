/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { makeStyles } from '@material-ui/core';

const shadow = '0 10px 30px rgba(0,37,132,.06)';
const borderRadius = 30;

const baseStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
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
    borderTopLeftRadius: borderRadius,
    borderTopRightRadius: borderRadius,
    padding: `${theme.spacing(5)}px ${theme.spacing(4)}px`,
    minHeight: 150,
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

const illustrationStyle = makeStyles({
  container: {
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

const authStyles = makeStyles((theme) => ({
  container: {
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    backgroundRepeat: 'no-repeat',
    background: `url(${process.env.PUBLIC_URL}/background.png)`,
  },
  title: {
    textAlign: 'left',
    paddingLeft: theme.spacing(4),
    color: 'white',
  },
  subContainer: {
    minHeight: '28vh',
    justifyContent: 'space-around',
    paddingTop: theme.spacing(1),
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

export { illustrationStyle, authStyles, roleStyles, shadow };

export default baseStyles;
