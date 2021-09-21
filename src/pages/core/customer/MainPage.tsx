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
  currentTab: number;
}

const TabPanels: React.FC<TabProps> = ({ currentTab }) => (
  <React.Fragment>
    <TabPanel value={currentTab} index={0}>
      <Home />
    </TabPanel>
    <TabPanel value={currentTab} index={1}>
      <Following />
    </TabPanel>
    <TabPanel value={currentTab} index={2}>
      <Orders />
    </TabPanel>
    <TabPanel value={currentTab} index={3}>
      <Settings />
    </TabPanel>
  </React.Fragment>
);

const MainPage = (): React.ReactElement => {
  const tabs = [
    {
      value: 0,
      label: 'Home',
      icon: <ExploreOutlined />,
    },
    {
      value: 1,
      label: 'Followed',
      icon: <FavoriteBorderOutlined />,
    },
    {
      value: 2,
      label: 'Orders',
      icon: <ConfirmationNumberOutlined />,
    },
    {
      value: 3,
      label: 'Settings',
      icon: <SettingsOutlined />,
    },
  ];
  return <TabsPage tabs={tabs} TabPanels={TabPanels} />;
};

export default MainPage;
