/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

enum PATHS {
  HOME = '/',
  SIGN_IN = '/signin',
  SIGN_UP = '/signup',
  FORGOT_PASSWORD = '/forgotPassword',
  USER_PROFILE = '/users/:id',
  CUSTOMER_MAIN = '/customer',
  CUSTOMER_EDIT = '/customer/edit',
  SELLER_MAIN = '/seller',
  SELLER_EDIT = '/seller/edit',
  STORE_PAGE = '/stores/:id',
  CHANGE_PASSWORD = '/changePassword',
  ARTICLE_FORM = '/article-form',
  ARTICLE_DETAILS_PAGE = '/article/:id/details',
  ARTICLE_DETAILS_FORM = '/article/:id/details/stock-form',
  // CUSTOMER_HOME = '/customer/',
  // CUSTOMER_FOLLOWING = '/customer/following',
  // CUSTOMER_ORDERS = '/customer/orders',
  // CUSTOMER_SETTINGS = '/customer/settings',
  SEARCH_ARTICLE = '/search',
  ARTICLE_PAGE = '/articles/:id',
  NOT_AUTHORIZED = '/notAuthorized',
  ERROR = '/error',
  NOT_FOUND = '*',
}

export default PATHS;
