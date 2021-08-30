import Store from './store';
import User from './user';

interface Customer extends User {
  id?: any;
  followerList: Store[];
}

export default Customer;
