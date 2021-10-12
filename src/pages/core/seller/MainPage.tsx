import React, { lazy } from 'react';
import SettingsOutlined from '@material-ui/icons/SettingsOutlined';
import ExploreOutlined from '@material-ui/icons/ExploreOutlined';
import ConfirmationNumberOutlined from '@material-ui/icons/ConfirmationNumberOutlined';
import StoreMallDirectoryOutlined from '@material-ui/icons/StoreMallDirectoryOutlined';
import TabsPage from '../common/TabPage';
import TabPanel from '../../../components/TabPanel';
import StocksPage from './StocksPage';

const Home = lazy(() => import('./home/Home'));
const Orders = lazy(() => import('../common/Orders'));
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
      <StocksPage />
    </TabPanel>
    <TabPanel value={currentTab} index={2}>
      <Orders role="Seller" />
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
      label: 'Stocks',
      icon: <StoreMallDirectoryOutlined />,
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
  return <TabsPage tabs={tabs} TabPanels={TabPanels} role="seller" />;
};

export default MainPage;
