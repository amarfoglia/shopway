import { ArticleDetails } from './article';
import Customer from './users/customer';
import Store from './users/store';

interface Order {
  _id: string;
  customer?: Customer;
  store: Store;
  size: string;
  bookDate: Date;
  orderExpireAt: Date;
  sold: boolean;
  articleDetails: ArticleDetails | string;
  code: string;
  nameArticle: string;
  brandArticle: string;
  quantity: number;
  totalPrice: number;
  color?: string;
}
export default Order;
