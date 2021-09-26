import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
import UserModel, { options } from './userModel';
import Customer from './customer';

interface CustomerDoc extends Document, Customer {}

const customerSchema = new mongoose.Schema({
  followerList: {
    type: [ObjectId],
    ref: 'Store',
    default: []
  }
}, options);

customerSchema.pre(/^find/, function _(next) {
  this.populate({ path: 'followerList' });
  next();
});

export { CustomerDoc };

export default UserModel.discriminator<CustomerDoc>('Customer', customerSchema);
