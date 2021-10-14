import React, { lazy } from 'react';
import { Route } from 'react-router-dom';
import MyRoute from '../components/MyRoute';

const ArticleDetailsPage = lazy(() => import('../pages/core/seller/stocks/ArticlesDetailsPage'));
const DetailsFormPage = lazy(() => import('../pages/core/seller/stocks/DetailsFormPage'));
const ArticleFormPage = lazy(() => import('../pages/core/seller/stocks/ArticleFormPage'));
const ArticlePage = lazy(() => import('../pages/core/common/ArticlePage'));

const url = '/article';

const AritcleRouter = (): React.ReactElement => (
  <>
    <MyRoute
      mustBe="Seller"
      exact
      path={`${url}/`}
      render={(props) => <ArticleFormPage {...props} />}
    />
    <Route exact path={`${url}/:id`} render={(props) => <ArticlePage {...props} />} />
    <MyRoute
      mustBe="Seller"
      exact
      path={`${url}/:id/details`}
      render={(props) => <ArticleDetailsPage {...props} />}
    />
    <MyRoute
      mustBe="Seller"
      path={`${url}/:id/details/stock-form`}
      render={(props) => <DetailsFormPage {...props} />}
    />
  </>
);

export default AritcleRouter;
