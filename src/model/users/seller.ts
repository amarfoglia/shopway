import User from './user';

interface Seller extends User {
  _id?: string;
  stores: string[];
}

export default Seller;
