import React, { useContext, useState } from 'react';
import { Container, makeStyles, Paper, Tabs, Tab, AppBar, Grid, Hidden } from '@material-ui/core';
import TopBar from '../../../components/MobileTopBar';
import AuthContext from '../../../hooks/useAuth';
import { useHistory } from 'react-router-dom';
import Loader from '../../../components/Loader';
import { UserAppBar } from '../../../components/DesktopTopBar';

const useStyles = makeStyles((theme) => ({
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

type Component = React.FC<{ currentTab: number }>;
type Role = 'customer' | 'seller';

interface Props {
  tabs: {
    value: number;
    label: string;
    icon: React.ReactElement;
  }[];
  TabPanels: Component;
  role?: Role;
}

const TabsPage: React.FC<Props> = ({ tabs, TabPanels, role = 'customer' }): React.ReactElement => {
  const classes = useStyles();
  const history = useHistory();
  const search = useHistory().location.search;
  const tab = new URLSearchParams(search).get('tab') ?? '0';
  const [currentTab, setCurrentTab] = useState<number>(parseInt(tab, 10));
  const { user } = useContext(AuthContext);

  // eslint-disable-next-line @typescript-eslint/ban-types
  const handleTabsChange = (event: React.ChangeEvent<{}>, newValue: number) =>
    handleTabChange(newValue);

  const handleTabChange = (newValue: number) => {
    setCurrentTab(newValue);
    history.replace({ pathname: history.location.pathname, search: `tab=${newValue}` });
  };

  const BottomTabs = () => (
    <Paper square>
      <Tabs
        value={currentTab}
        onChange={handleTabsChange}
        variant="fullWidth"
        TabIndicatorProps={{ style: { display: 'none' } }}
        textColor="primary"
        aria-label={`${role} tabs`}
        className={classes.tabs}
      >
        {tabs.map((t) => (
          <Tab key={t.value} icon={t.icon} label={t.label} value={t.value} />
        ))}
      </Tabs>
    </Paper>
  );

  const isTopBarVisible = currentTab !== tabs[tabs.length - 1].value;

  return (
    <div>
      <Hidden xsDown>
        <UserAppBar tabs={tabs} handleChange={handleTabChange} />
      </Hidden>
      <Container maxWidth="md" className={classes.container}>
        <Grid container spacing={2}>
          <Hidden smUp>
            {isTopBarVisible && (
              <Grid item xs={12}>
                <TopBar
                  variant="user"
                  userName={user?.fullName}
                  position="relative"
                  p={0}
                  subject={role === 'customer' ? 'Customer' : 'Seller'}
                  avatarPath={user?.photo as string}
                />
              </Grid>
            )}
          </Hidden>
          <Grid item xs={12}>
            <React.Suspense fallback={<Loader />}>
              <TabPanels currentTab={currentTab} />
            </React.Suspense>
          </Grid>
        </Grid>
      </Container>
      <Hidden smUp>
        <AppBar position="fixed" className={classes.appBar}>
          <BottomTabs />
        </AppBar>
      </Hidden>
    </div>
  );
};

export default TabsPage;
