import React, { lazy, useContext, useState } from 'react';
import { Container, makeStyles, Paper, Tabs, Tab, AppBar, Grid } from '@material-ui/core';
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
const Settings = lazy(() => import('./Settings'));

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

const MainPage = (): React.ReactElement => {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState(PATHS.CUSTOMER_HOME.toString());
  const { user } = useContext(AuthContext);

  // eslint-disable-next-line @typescript-eslint/ban-types
  const handleChange = async (event: React.ChangeEvent<{}>, newValue: string) => {
    setCurrentTab(newValue);
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
        <Settings />
      </TabPanel>
    </React.Fragment>
  );

  return (
    <React.Fragment>
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
