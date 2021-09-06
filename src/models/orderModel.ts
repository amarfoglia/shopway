import mongoose, { PopulatedDoc } from 'mongoose';
import { ObjectId } from 'mongodb';
import Order from './order';
import { ONE_SEC_IN_MS } from '../utils/time';
import { ArticleDetails } from './articles/article';
import Customer from './users/customer';
import Seller from './users/seller';

interface OrderDoc extends Document, Order {
  articleDetails?: PopulatedDoc<ArticleDetails & Document>
  customer?: PopulatedDoc<Customer & Document>
  seller?: PopulatedDoc<Seller & Document>
}

const orderSchema = new mongoose.Schema({
  customer: {
    type: ObjectId,
    required: [true, 'A customer must belong to an Order'],
    ref: 'Customer'
  },
  store: {
    name: {
      type: String,
      required: [true, 'Please, provide the store name']
    },
    id: {
      type: ObjectId,
      required: [true, 'Please, provide the store id']
    }
  },
  articleDetails: {
    type: ObjectId,
    required: [true, 'An Article Details must belong to an Order'],
    ref: 'ArticleDetails'
  },
  nameArticle: {
    type: String,
    required: [true, 'Please, provide the name of the article']
  },
  brandArticle: {
    type: String,
    required: [true, 'Please provide the brand of the Article']
  },
  size: {
    type: String,
    required: [true, 'Please provide the size of the article']
  },
  bookDate: {
    type: Date,
    required: [true, 'An order must have a book date'],
    default: () => new Date(Date.now() - ONE_SEC_IN_MS)
  },
  orderExpireAt: {
    type: Date,
    required: [true, 'An order must have an expire date']
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

orderSchema.pre(/^find/, function _(next) {
  this.populate({ path: 'articleDetails', select: 'articleId color price image discount' })
    .populate({ path: 'customer', select: 'fullName _id' });
  next();
});

export { OrderDoc };
export default mongoose.model<OrderDoc>('Order', orderSchema);
