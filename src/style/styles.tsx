/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { makeStyles } from '@material-ui/core';

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
    backgroundColor: 'blanchedalmond',
  },
  title: {
    textAlign: 'left',
    padding: theme.spacing(4),
  },
  subContainer: {
    justifyContent: 'space-around',
    paddingTop: theme.spacing(1),
  },
}));

const roleStyles = makeStyles((theme) => ({
  imageRoleContainer: {
    borderRadius: 30,
    padding: theme.spacing(1),
    boxShadow: '0 10px 30px rgba(0,37,132,.06)',
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

export { homeStyles, loginStyles, roleStyles };

export default baseStyles;
