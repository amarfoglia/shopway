import React, { useContext } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import Routes from '../utils/routes';
import { Grid } from '@material-ui/core';
import AuthContext from '../hooks/useAuth';
import MyAvatar from './MyAvatar';
import NotificationsPopOver from './NotificationsPopOver';
import Seller from '../model/users/seller';
import MenuPopOver from './MenuPopOver';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
      fontSize: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    toolbar: {
      display: 'flex',
      '& button': { fontSize: theme.spacing(2.4) },
    },
  }),
);

interface AppBarItems {
  left?: React.ReactElement;
  right?: React.ReactElement;
}

const TopAppBar: React.FC<AppBarItems> = ({ left, right }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="sticky">
        <Container maxWidth="md">
          <Toolbar className={classes.toolbar} disableGutters>
            <Grid
              container
              alignItems="center"
              justifyContent="space-between"
              alignContent="flex-start"
              style={{ display: 'flex' }}
            >
              <Grid item>
                <Grid container alignItems="center" spacing={3}>
                  <Grid item>
                    <Typography variant="h5">
                      <b>Shopway</b>
                    </Typography>
                  </Grid>
                  <Grid item>{left}</Grid>
                </Grid>
              </Grid>
              <Grid item>{right}</Grid>
            </Grid>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

interface Props {
  tabs: {
    value: number;
    label: string;
  }[];
  handleChange: (t: number) => void;
}

const UserAppBar: React.FC<Props> = ({ tabs, handleChange }) => {
  const { user, logout } = useContext(AuthContext);
  const isCustomer = user?.role === 'Customer';

  const _renderUserAvatar = () => {
    const avatar = (
      <MyAvatar
        text={user?.fullName}
        imagePath={isCustomer ? (user?.photo as string) : (user as Seller).stores?.[0]}
        subject={isCustomer ? 'user' : 'store'}
        size={'medium'}
        alt={`${user?.fullName}'s avatar`}
      />
    );
    return (
      <MenuPopOver
        id="user-menu"
        label="user menu"
        CustomNode={avatar}
        onChange={logout}
        items={[{ value: 'log-out', label: 'Log out' }]}
      />
    );
  };

  return (
    <TopAppBar
      left={
        <React.Fragment>
          {tabs.map((t) => (
            <Button color="inherit" key={t.label} onClick={() => handleChange(t.value)}>
              {t.label}
            </Button>
          ))}
        </React.Fragment>
      }
      right={
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <NotificationsPopOver />
          </Grid>
          <Grid item xs={6}>
            {_renderUserAvatar()}
          </Grid>
        </Grid>
      }
    />
  );
};

export { UserAppBar };

const IllustrationAppBar = (): React.ReactElement => {
  const history = useHistory();
  return (
    <TopAppBar
      right={
        <React.Fragment>
          <Button color="inherit" onClick={() => history.push(Routes.HOME)}>
            Home
          </Button>
          <Button color="inherit" onClick={() => history.push(Routes.SIGN_UP)}>
            Signup
          </Button>
          <Button color="inherit" onClick={() => history.push(Routes.SIGN_IN)}>
            Login
          </Button>
        </React.Fragment>
      }
    />
  );
};

export default IllustrationAppBar;
