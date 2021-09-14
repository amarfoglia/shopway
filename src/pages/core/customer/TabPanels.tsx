import React, { lazy } from 'react';
import TabPanel from '../../../components/TabPanel';
import PATHS from '../../../utils/routes';

const Home = lazy(() => import('./Home'));
const Orders = lazy(() => import('./Orders'));
const Following = lazy(() => import('./Follow'));
const Settings = lazy(() => import('./Settings'));

interface TabProps {
  currentTab: string;
}

const TabPanels: React.FC<TabProps> = ({ currentTab }) => (
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

export default TabPanels;
