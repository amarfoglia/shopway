import User from './user';

interface Customer extends User {
  _id?: string;
  followerList: string[];
}

export default Customer;
