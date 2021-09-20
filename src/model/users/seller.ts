import User from './user';

interface Seller extends User {
  stores: string[];
}

export default Seller;
