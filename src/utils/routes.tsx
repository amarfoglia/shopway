/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

enum Routes {
  HOME = '/',
  LOGOUT = '/logout',
  ERROR = '/error',
  NOT_FOUND = '*',

  SIGN_IN = '/auth/signin',
  SIGN_UP = '/auth/signup',
  NOT_AUTHORIZED = '/auth/notAuthorized',
  FORGOT_PASSWORD = '/auth/forgotPassword',
  CHANGE_PASSWORD = '/auth/changePassword',

  USER_PROFILE = '/users/:id',

  CUSTOMER_MAIN = '/customer',
  CUSTOMER_EDIT = '/customer/edit',
  SEARCH_ARTICLE = '/customer/search',

  SELLER_MAIN = '/seller',
  SELLER_EDIT = '/seller/edit',
  STORE_PAGE = '/stores/:id',

  ARTICLE_FORM = '/article/',
  ARTICLE_PAGE = '/article/:id',
  ARTICLE_DETAILS_PAGE = '/article/:id/details',
  ARTICLE_DETAILS_FORM = '/article/:id/details/stock-form',
}

export default Routes;
