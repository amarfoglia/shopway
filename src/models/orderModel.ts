import mongoose, { PopulatedDoc } from 'mongoose';
import { addDays, addHours } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import AppError from '../utils/appError';
import Order from './order';
import { ArticleDetails } from './articles/article';
import Customer from './users/customer';
import Seller from './users/seller';
import ArticleDetailsModel from './articles/articleDetailsModel';
import generateCode from '../utils/generateCode';

interface OrderDoc extends Document, Order {
  articleDetails?: PopulatedDoc<ArticleDetails & Document>;
  customer?: PopulatedDoc<Customer & Document>;
  seller?: PopulatedDoc<Seller & Document>;
}
const getCurrentDate = () => addHours(utcToZonedTime(Date.now(), 'Europe/Rome'), 2);

const getNextDayFromToday = () => addDays(addHours(utcToZonedTime(Date.now(), 'Europe/Rome'), 2), 1);

interface IOrderModel extends mongoose.Model<OrderDoc> {}
const orderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Types.ObjectId,
    required: [true, 'A customer must belong to an Order'],
    ref: 'Customer'
  },
  store: {
    type: mongoose.Types.ObjectId,
    required: [true, 'A store must belong to an Order'],
    ref: 'Store'
  },
  articleDetails: {
    type: mongoose.Types.ObjectId,
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
    default: () => getCurrentDate()
  },
  code: {
    type: String,
    default: () => generateCode(),
    unique: true
  },
  orderExpireAt: {
    type: Date,
    default: () => getNextDayFromToday()
  },
  totalPrice: {
    type: Number,
    required: [true, 'Please, provide the price of order']
  },
  sold: {
    type: Boolean,
    default: false
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

orderSchema.pre('find', function _(next) {
  this.populate({ path: 'articleDetails', select: 'articleId color price image discount' })
    .populate({ path: 'store', select: '_id name logo' })
    .populate({ path: 'customer', select: 'fullName _id photo' });
  next();
});

orderSchema.pre<OrderDoc>('save', async function _(next) {
  const order = this;
  const update = { $inc: { 'stockArticles.$[e].quantity': -1 } };
  const filter = { _id: order.articleDetails };
  const options = { arrayFilters: [{ 'e.size': order.size, 'e.quantity': { $gte: 1 } }] };
  if ((this as any).isNew) {
    const result: any = await ArticleDetailsModel.updateOne(filter, update, options);
    if (result.nModified === 0) {
      next(new AppError('Product not avaiable', 400));
      return;
    }
  }
  next();
});

export { OrderDoc, IOrderModel };
export default <IOrderModel>mongoose.model<OrderDoc>('Order', orderSchema);
