import mongoose, { Mongoose } from 'mongoose';
import Seller from './seller';
import UserModel from './userModel';

interface SellerDoc extends Document, Seller {}

const options = { discriminatorKey: 'role' };
const StoreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please, provide the store name']
  },
  city: {
    type: String,
    required: [true, 'Please, provide the city name']
  },
  address: {
    type: String,
    required: [true, 'Please, provide the store address']
  },
  logo: {
    type: String
  },
  phone: {
    type: String,
    required: [true, 'Please, provide the store number']
  }
});
const sellerSchema = new mongoose.Schema({
  stores: [StoreSchema]
}, options);

export { SellerDoc, StoreSchema };

export default UserModel.discriminator<SellerDoc>('Seller', sellerSchema);
