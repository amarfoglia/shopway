import React, { lazy, useContext, useState } from 'react';
import { Container, makeStyles, Paper, Tabs, Tab, AppBar, Grid } from '@material-ui/core';
// import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import PATHS from '../../../utils/routes';
import Loader from '../../../components/Loader';
import SettingsOutlined from '@material-ui/icons/SettingsOutlined';
import ExploreOutlined from '@material-ui/icons/ExploreOutlined';
import FavoriteBorderOutlined from '@material-ui/icons/FavoriteBorderOutlined';
import ConfirmationNumberOutlined from '@material-ui/icons/ConfirmationNumberOutlined';
import TopSection from '../../../components/TopSection';
import AuthContext from '../../../hooks/useAuth';
import TabPanel from '../../../components/TabPanel';

const Home = lazy(() => import('./Home'));
const Orders = lazy(() => import('./Orders'));
const Following = lazy(() => import('./Follow'));
const Settings = lazy(() => import('../common/ProductPage'));

const useStyles = makeStyles((theme) => ({
  root: {
    flexDirection: 'column',
  },
  container: {
    padding: `${theme.spacing(3)}px ${theme.spacing(3)}px`,
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

const articleDetails = {
  article: {
    name: 'Air 50',
    brand: 'NIKE',
    description:
      "Nike's athletic footwear products are designed primarily for specific athletic use, although a large percentage of the products are worn for casual or leisure",
    sizes: ['38', '40', '41', '42', '43'],
    colors: ['red', 'white', 'black', 'green'],
    price: 79,
  },
  store: {
    name: 'Nike Store',
  },
};

// const validPaths = [
//   PATHS.CUSTOMER_HOME.toString(),
//   PATHS.CUSTOMER_FOLLOWING.toString(),
//   PATHS.CUSTOMER_SETTINGS.toString(),
//   PATHS.CUSTOMER_ORDERS.toString(),
// ];

// const checkPath = (url: string) => validPaths.includes(url);

const MainPage = (): React.ReactElement => {
  const classes = useStyles();
  // const history = useHistory();
  // const location = useLocation();
  const [currentTab, setCurrentTab] = useState(PATHS.CUSTOMER_HOME.toString());
  //   checkPath(location.pathname) ? location.pathname : PATHS.CUSTOMER_HOME,
  // );
  const { user } = useContext(AuthContext);

  // eslint-disable-next-line @typescript-eslint/ban-types
  const handleChange = async (event: React.ChangeEvent<{}>, newValue: string) => {
    setCurrentTab(newValue);
    //history.push(newValue);
  };

  const BottomTabs = () => (
    <Paper square>
      <Tabs
        value={currentTab}
        onChange={handleChange}
        variant="fullWidth"
        TabIndicatorProps={{ style: { display: 'none' } }}
        textColor="primary"
        aria-label="customer tabs"
        className={classes.tabs}
      >
        <Tab icon={<ExploreOutlined />} label="Explore" value={PATHS.CUSTOMER_HOME} />
        <Tab icon={<FavoriteBorderOutlined />} label="Followed" value={PATHS.CUSTOMER_FOLLOWING} />
        <Tab icon={<ConfirmationNumberOutlined />} label="Orders" value={PATHS.CUSTOMER_ORDERS} />
        <Tab icon={<SettingsOutlined />} label="Settings" value={PATHS.CUSTOMER_SETTINGS} />
      </Tabs>
    </Paper>
  );

  const TabsPanel = () => (
    <React.Fragment>
      <TabPanel value={currentTab} index={PATHS.CUSTOMER_HOME}>
        <Home />
      </TabPanel>
      <TabPanel value={currentTab} index={PATHS.CUSTOMER_FOLLOWING}>
        <Following />
      </TabPanel>
      <TabPanel value={currentTab} index={PATHS.CUSTOMER_ORDERS}>
        <Orders />
      </TabPanel>
      <TabPanel value={currentTab} index={PATHS.CUSTOMER_SETTINGS}>
        <Settings {...articleDetails} />
      </TabPanel>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      {/* <Container maxWidth="md" className={classes.container}>
        <Grid container direction="column" spacing={2}>
          {currentTab !== PATHS.CUSTOMER_SETTINGS && (
            <Grid item xs={12}>
              <TopSection variant="user" userName={user?.fullName} />
            </Grid>
          )}
          <Grid item xs={12}>
            <React.Suspense fallback={<Loader />}>
              <Switch>
                <Route path={PATHS.CUSTOMER_FOLLOWING} render={() => <Following />} />
                <Route path={PATHS.CUSTOMER_ORDERS} render={() => <Orders />} />
                <Route
                  path={PATHS.CUSTOMER_SETTINGS}
                  render={() => <Settings {...articleDetails} />}
                />
                <Route path={PATHS.CUSTOMER_HOME} render={() => <Home />} />
              </Switch>
            </React.Suspense>
          </Grid>
        </Grid>
      </Container> */}
      <Container maxWidth="md" className={classes.container}>
        <Grid container direction="column" spacing={2}>
          {currentTab !== PATHS.CUSTOMER_SETTINGS && (
            <Grid item xs={12}>
              <TopSection variant="user" userName={user?.fullName} />
            </Grid>
          )}
          <Grid item xs={12}>
            <React.Suspense fallback={<Loader />}>
              <TabsPanel />
            </React.Suspense>
          </Grid>
        </Grid>
      </Container>
      <AppBar position="fixed" className={classes.appBar}>
        <BottomTabs />
      </AppBar>
    </React.Fragment>
  );
};

export default MainPage;
