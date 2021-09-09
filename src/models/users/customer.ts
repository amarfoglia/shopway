import { ObjectId } from 'mongodb';
import User from './user';

interface Customer extends User {
  id?: string;
  photo: string;
  followerList: string[];
}

function getObjectId(this: Customer): ObjectId { return new ObjectId(this.id); }
export default Customer;
