import Store from './store';
import User from './user';

interface Customer extends User {
  followerList: Store[];
}

export default Customer;
