import mongoose from 'mongoose';
import Seller from './seller';
import UserModel from './userModel';

interface SellerDoc extends Document, Seller {}

const options = { discriminatorKey: 'role' };

const sellerSchema = new mongoose.Schema({
  stores: [{
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
  }]
}, options);

export { SellerDoc };

export default UserModel.discriminator<SellerDoc>('Seller', sellerSchema);
