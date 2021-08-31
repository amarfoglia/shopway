import Store from './Store';
import User from './User';

interface Seller extends User {
  id?: string;
  store: Store[];
}

export default Seller;
