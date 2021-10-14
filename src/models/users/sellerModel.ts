import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
import Seller from './seller';
import UserModel, { options } from './userModel';

interface SellerDoc extends Document, Seller {}

const sellerSchema = new mongoose.Schema({
  stores: {
    type: [ObjectId],
    required: [true, 'A seller must have at least one store!'],
    ref: 'Store',
    default: []
  }
}, options);

export { SellerDoc };

export default UserModel.discriminator<SellerDoc>('Seller', sellerSchema);
