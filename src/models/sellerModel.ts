import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
import Seller from './seller';
import UserModel from './userModel';

interface SellerDoc extends Document, Seller {}

const options = { discriminatorKey: 'role' };

const sellerSchema = new mongoose.Schema({
  store: [{
    _id: {
      type: ObjectId,
      default: () => new ObjectId()
    },
    name: {
      type: String,
      required: [true, 'Please, provide the store name']
    },
    address: {
      type: String,
      required: [true, 'Please, provide the store address']
    },
    logo: {
      type: String
    },
    phoneNumber: {
      type: String,
      required: [true, 'Please, provide the store number']
    }
  }]
}, options);

export { SellerDoc };

export default UserModel.discriminator<SellerDoc>('Seller', sellerSchema);
