/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

enum PATHS {
  HOME = '/',
  SIGN_IN = '/signin',
  SIGN_UP = '/signup',
  FORGOT_PASSWORD = '/forgotPassword',
  CUSTOMER_PROFILE = '/customers/:id',
  CUSTOMER_MAIN = '/customer',
  CUSTOMER_EDIT = '/customer/edit',
  CUSTOMER_CHANGE_PASSWORD = '/customer/changePassword',
  CUSTOMER_HOME = '/customer/',
  CUSTOMER_FOLLOWING = '/customer/following',
  CUSTOMER_ORDERS = '/customer/orders',
  CUSTOMER_SETTINGS = '/customer/settings',
  STORE_PAGE = '/stores/:id',
  SEARCH_ARTICLE = '/search',
  ARTICLE_DETAILS = '/articles/:id',
  NOT_AUTHORIZED = '/notAuthorized',
  NOT_FOUND = '*',
}

export default PATHS;
