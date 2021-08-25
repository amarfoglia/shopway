import { ObjectId } from 'bson';
import mongoose, { Document } from 'mongoose';

const sellerSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
        ref: 'User',
        required: [true, 'Please, provide a userId']
    },
    storeList: {
        type: [ObjectId],
        ref: 'Store'
    },
});

export default mongoose.model('Seller', sellerSchema);