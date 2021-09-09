import { ObjectId } from 'mongodb';
import User from './user';

interface Seller extends User {
  id?: string;
  stores: string[];
}

function getObjectId(this: Seller): ObjectId { return new ObjectId(this.id); }

export default Seller;
