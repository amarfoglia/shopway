import React, { lazy } from 'react';
import SettingsOutlined from '@material-ui/icons/SettingsOutlined';
import ExploreOutlined from '@material-ui/icons/ExploreOutlined';
import FavoriteBorderOutlined from '@material-ui/icons/FavoriteBorderOutlined';
import ConfirmationNumberOutlined from '@material-ui/icons/ConfirmationNumberOutlined';
import TabsPage from '../common/TabPage';
import TabPanel from '../../../components/TabPanel';

const Home = lazy(() => import('./Home'));
const Orders = lazy(() => import('./Orders'));
const Following = lazy(() => import('./Follow'));
const Settings = lazy(() => import('../common/Settings'));

interface TabProps {
  currentTab: string;
}

const TabPanels: React.FC<TabProps> = ({ currentTab }) => (
  <React.Fragment>
    <TabPanel value={currentTab} index={'home'}>
      <Home />
    </TabPanel>
    <TabPanel value={currentTab} index={'following'}>
      <Following />
    </TabPanel>
    <TabPanel value={currentTab} index={'orders'}>
      <Orders />
    </TabPanel>
    <TabPanel value={currentTab} index={'settings'}>
      <Settings />
    </TabPanel>
  </React.Fragment>
);

const MainPage = (): React.ReactElement => {
  const tabs = [
    {
      value: 'home',
      label: 'Home',
      icon: <ExploreOutlined />,
    },
    {
      value: 'following',
      label: 'Followed',
      icon: <FavoriteBorderOutlined />,
    },
    {
      value: 'orders',
      label: 'Orders',
      icon: <ConfirmationNumberOutlined />,
    },
    {
      value: 'settings',
      label: 'Settings',
      icon: <SettingsOutlined />,
    },
  ];
  return <TabsPage tabs={tabs} TabPanels={TabPanels} role="customer" />;
};

export default MainPage;
