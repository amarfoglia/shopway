import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const sellerSchema = new mongoose.Schema({
  userId: {
    type: ObjectId,
    ref: 'User',
    required: [true, 'Please, provide a userId'],
  },
  store: {
    type: Object,
    name: {
      type: String,
      required: [true, 'Please, provide the store name'],
    },
    address: {
      type: String,
      required: [true, 'Please, provide the store address'],
    },
    logo: {
      type: String,
    },
    phoneNumber: {
      type: String,
      required: [true, 'Please, provide the store number'],
    },
  },
});

export default mongoose.model('Seller', sellerSchema);
