import React, { lazy } from 'react';
import { Route } from 'react-router-dom';

const EditProfilePage = lazy(() => import('../pages/core/common/EditProfile'));
const SellerPage = lazy(() => import('../pages/core/seller/MainPage'));

const url = '/seller';

const SellerRouter = (): React.ReactElement => (
  <>
    <Route exact path={`${url}/`} render={() => <SellerPage />} />
    <Route path={`${url}/edit`} render={() => <EditProfilePage />} />
  </>
);

export default SellerRouter;
