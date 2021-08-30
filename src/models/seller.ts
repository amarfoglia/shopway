import Store from './store';
import User from './user';

interface Seller extends User {
  id?: any;
  fullname: string;
  store: Store[];
}

export default Seller;
