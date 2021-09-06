import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
import UserModel from './userModel';
import Customer from './customer';

interface CustomerDoc extends Document, Customer {}

const options = { discriminatorKey: 'role' };

const customerSchema = new mongoose.Schema({
  followerList: {
    type: [ObjectId],
    ref: 'Store'
  },
  photo: {
    type: String,
    default: 'default.jpg'
  }
}, options);
export { CustomerDoc };

export default UserModel.discriminator<CustomerDoc>('Customer', customerSchema);
