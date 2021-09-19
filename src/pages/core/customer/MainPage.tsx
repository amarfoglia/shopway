import React, { lazy, useContext, useState } from 'react';
import { Container, makeStyles, Paper, Tabs, Tab, AppBar, Grid } from '@material-ui/core';
import SettingsOutlined from '@material-ui/icons/SettingsOutlined';
import ExploreOutlined from '@material-ui/icons/ExploreOutlined';
import FavoriteBorderOutlined from '@material-ui/icons/FavoriteBorderOutlined';
import ConfirmationNumberOutlined from '@material-ui/icons/ConfirmationNumberOutlined';
import TopBar from '../../../components/TopBar';
import AuthContext from '../../../hooks/useAuth';
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#f9f9f9',
    flexGrow: 1,
  },
  container: {
    padding: `${theme.spacing(3)}px ${theme.spacing(3)}px`,
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

export type CurrentTab = 'home' | 'orders' | 'following' | 'settings';

const MainPage = (): React.ReactElement => {
  const classes = useStyles();
  const search = useLocation().search;
  const tab = new URLSearchParams(search).get('tab');
  const [currentTab, setCurrentTab] = useState<CurrentTab | string>(tab ?? 'home');
  const { user } = useContext(AuthContext);

  // eslint-disable-next-line @typescript-eslint/ban-types
  const handleChange = (event: React.ChangeEvent<{}>, newValue: CurrentTab) =>
    setCurrentTab(newValue);

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
        <Tab icon={<ExploreOutlined />} label="Explore" value="home" />
        <Tab icon={<FavoriteBorderOutlined />} label="Followed" value="following" />
        <Tab icon={<ConfirmationNumberOutlined />} label="Orders" value="orders" />
        <Tab icon={<SettingsOutlined />} label="Settings" value="settings" />
      </Tabs>
    </Paper>
  );

  const LazyTabsPanel = lazy(() => import('./TabPanels'));
  return (
    <div className={classes.root}>
      <Container maxWidth="md" className={classes.container}>
        <Grid container spacing={2}>
          {currentTab !== 'settings' && (
            <Grid item xs={12}>
              <TopBar
                variant="user"
                userName={user?.fullName}
                position="relative"
                p={0}
                userImagePath={user?.photo as string}
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <LazyTabsPanel currentTab={currentTab} />
          </Grid>
        </Grid>
      </Container>
      <AppBar position="fixed" className={classes.appBar}>
        <BottomTabs />
      </AppBar>
    </div>
  );
};

export default MainPage;
