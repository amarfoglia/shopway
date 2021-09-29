import User from './user';

interface Customer extends User {
  followerList: string[];
}

export default Customer;
