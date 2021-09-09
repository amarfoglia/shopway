import { ObjectId } from 'mongodb';
import mongoose, { PopulatedDoc } from 'mongoose';
import UserModel, { options } from './userModel';
import Customer from './customer';

interface CustomerDoc extends Document, Customer {}

const customerSchema = new mongoose.Schema({
  followerList: {
    type: [ObjectId],
    ref: 'Store',
    default: []
  },
  photo: {
    type: String,
    default: 'default.jpg'
  }
}, options);
export { CustomerDoc };

export default UserModel.discriminator<CustomerDoc>('Customer', customerSchema);
