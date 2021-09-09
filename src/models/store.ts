import { ObjectId } from 'mongodb';

/* eslint-disable no-unused-vars */
interface Store {
  id?: string;
  name: string;
  city: string;
  address: string;
  logo?: string;
  phone: string;
}
function getObjectId(this: Store): ObjectId { return new ObjectId(this.id); }
export default Store;
