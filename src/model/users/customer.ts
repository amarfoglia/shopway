import Store from './store';
import User from './user';

interface Customer extends User {
  _id?: string;
  followerList: Store[];
}

export default Customer;
