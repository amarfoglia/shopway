import Store from '../store';
import User from './user';

interface Seller extends User {
  id?: any;
  stores: Store[];
}

export default Seller;
