import Store from './store';
import User from './user';

interface Seller extends User {
  id?: any;
  store: Store[];
}

export default Seller;
