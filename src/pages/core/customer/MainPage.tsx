import React, { lazy } from 'react';
import { Container, makeStyles, Paper, Tabs, Tab, AppBar } from '@material-ui/core';
import { Switch, Route, useHistory } from 'react-router-dom';
import PATHS from '../../../utils/routes';
import Loader from '../../../components/Loader';
import SettingsOutlined from '@material-ui/icons/SettingsOutlined';
import ExploreOutlined from '@material-ui/icons/ExploreOutlined';
import FavoriteBorderOutlined from '@material-ui/icons/FavoriteBorderOutlined';
import ConfirmationNumberOutlined from '@material-ui/icons/ConfirmationNumberOutlined';

const Home = lazy(() => import('./Home'));
const Orders = lazy(() => import('../../HomePage'));
const Following = lazy(() => import('../../NotAuthorized'));
const Settings = lazy(() => import('../../NotFoundPage'));

const useStyles = makeStyles((theme) => ({
  root: {
    flexDirection: 'column',
  },
  container: {
    padding: `${theme.spacing(4)}px ${theme.spacing(3)}px`,
    backgroundColor: '#f9f9f9',
    height: `calc(100vh - 72px)`,
    overflowY: 'auto',
  },
  tabs: {
    '& span': {
      textTransform: 'capitalize',
    },
    '& button': {
      lineHeight: 1,
      fontSize: 12,
    },
  },
  appBar: {
    top: 'auto',
    bottom: 0,
  },
}));

const MainPage = (): React.ReactElement => {
  const classes = useStyles();
  const history = useHistory();
  const [value, setValue] = React.useState<string>(PATHS.CUSTOMER_HOME);

  // eslint-disable-next-line @typescript-eslint/ban-types
  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
    history.push(newValue);
  };

  const BottomTabs = () => (
    <Paper square>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        TabIndicatorProps={{
          style: {
            display: 'none',
          },
        }}
        textColor="primary"
        aria-label="customer tabs"
        className={classes.tabs}
      >
        <Tab icon={<ExploreOutlined />} label="Explore" value={PATHS.CUSTOMER_HOME} />
        <Tab icon={<FavoriteBorderOutlined />} label="Favorites" value={PATHS.CUSTOMER_FOLLOWING} />
        <Tab icon={<ConfirmationNumberOutlined />} label="Orders" value={PATHS.CUSTOMER_ORDERS} />
        <Tab icon={<SettingsOutlined />} label="Settings" value={PATHS.CUSTOMER_SETTINGS} />
      </Tabs>
    </Paper>
  );

  return (
    <React.Suspense fallback={<Loader />}>
      <Container maxWidth="md" className={classes.container}>
        <Switch>
          <Route exact path={PATHS.CUSTOMER_HOME} render={() => <Home />} />
          <Route path={PATHS.CUSTOMER_FOLLOWING} render={() => <Following />} />
          <Route path={PATHS.CUSTOMER_ORDERS} render={() => <Orders />} />
          <Route path={PATHS.CUSTOMER_SETTINGS} render={() => <Settings />} />
        </Switch>
      </Container>
      <AppBar position="fixed" className={classes.appBar}>
        <BottomTabs />
      </AppBar>
    </React.Suspense>
  );
};

export default MainPage;
