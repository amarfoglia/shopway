import User from './user';

interface Customer extends User {
  id?: string;
  followerList: string[];
}
export default Customer;
