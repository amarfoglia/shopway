import mongoose from 'mongoose';
import Store from './store';

interface StoreDoc extends Document, Store {}

const storeSchema = new mongoose.Schema({
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

export { StoreDoc };

export default mongoose.model<StoreDoc>('Store', storeSchema);
