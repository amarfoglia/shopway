/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

enum PATHS {
  HOME = '/',
  SIGN_IN = '/signin',
  SIGN_UP = '/signup',
  FORGOT_PASSWORD = '/forgotPassword',
  CUSTOMER_MAIN = '/customers',
  CUSTOMER_HOME = '/customers/',
  CUSTOMER_PROFILE = '/customers/:id',
  CUSTOMER_FOLLOWING = '/customers/following',
  CUSTOMER_ORDERS = '/customers/orders',
  CUSTOMER_SETTINGS = '/customers/settings',
  STORE_PAGE = '/stores/:id',
  NOT_AUTHORIZED = '/notAuthorized',
  NOT_FOUND = '*',
}

export default PATHS;
