import { ObjectId } from 'bson';
import mongoose, { Document } from 'mongoose';

const customerSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
        ref: 'User',
        required: [true, 'Please, provide the customerId']
    },
    followerList: {
        type: [ObjectId],
        ref: 'Store'
    }
});

export default mongoose.model('Customer', customerSchema);