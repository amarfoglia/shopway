import { ArticleDetails } from './articles/article';
import Customer from './users/customer';

interface Order {
  id?: string;
  customerId: string;
  articleDetailsId: string;
  sellerId: string;
  bookDate: Date;
  orderExpireAt: Date;
}

export default Order;
