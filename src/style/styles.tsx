/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { makeStyles } from '@material-ui/core';

const shadow = '0 10px 30px rgba(0,37,132,.06)';

const baseStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    minHeight: '100%',
    flexDirection: 'column',
  },
  title: {
    fontWeight: 'bold',
    textTransform: 'capitalize',
    color: theme.palette.primary.main,
  },
  link: {
    textDecoration: 'none',
  },
  paperPopup: {
    borderRadius: '30px 30px 0px 0px',
    paddingBlock: theme.spacing(6),
    paddingInline: theme.spacing(4),
  },
  backFabGrid: {
    textAlign: 'left',
    paddingLeft: theme.spacing(4),
    height: 28,
  },
}));

const homeStyles = makeStyles({
  container: {
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

const loginStyles = makeStyles((theme) => ({
  container: {
    alignItems: 'flex-start',
    justifyContent: 'space-between',
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
    borderRadius: 30,
    padding: theme.spacing(1),
    boxShadow: shadow,
  },
  unselectedRoleTitle: {
    fontWeight: 'normal',
    textTransform: 'capitalize',
  },
  selectedRoleTitle: {
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  selectedRoleImage: {
    width: '100%',
    opacity: 1,
  },
  unselectedRoleImage: {
    width: '90%',
    opacity: 0.6,
  },
  radio: {
    display: 'none',
  },
  label: {
    margin: 0,
  },
}));

const customerStyle = makeStyles({
  avatarPreview: {
    width: 100,
    height: 100,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    borderRadius: 70,
    boxShadow: shadow,
  },
});

export { homeStyles, loginStyles, roleStyles, customerStyle };

export default baseStyles;
