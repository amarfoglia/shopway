import React, { lazy } from 'react';
import TabPanel from '../../../components/TabPanel';

const Home = lazy(() => import('./Home'));
const Orders = lazy(() => import('./Orders'));
const Following = lazy(() => import('./Follow'));
const Settings = lazy(() => import('./Settings'));

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

export default TabPanels;
