import React, { lazy } from 'react';
import { Route } from 'react-router-dom';

const EditProfilePage = lazy(() => import('../pages/core/common/EditProfile'));
const CustomerPage = lazy(() => import('../pages/core/customer/MainPage'));
const SearchPage = lazy(() => import('../pages/core/search.article/SearchPage'));

const url = '/customer';

const CustomerRouter = (): React.ReactElement => (
  <>
    <Route exact path={`${url}/`} render={() => <CustomerPage />} />
    <Route path={`${url}/edit`} render={() => <EditProfilePage />} />
    <Route path={`${url}/search`} render={(props) => <SearchPage {...props} />} />
  </>
);

export default CustomerRouter;
