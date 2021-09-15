import User from './user';

interface Seller extends User {
  id?: string;
  stores: string[];
}

export default Seller;
