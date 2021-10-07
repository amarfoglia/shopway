import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
interface PairUserDate {
  readAt?: Date;
  user: any;
}
interface Notification {
  id?: any;
  heading: string;
  content: string;
  receivers: string[];
  sender?: string;
  readBy: PairUserDate[];
}

function notificationNewProduct(receivers: string[], sender: string, readBy: PairUserDate[]) {
  const notify: Notification = {
    heading: 'new Product',
    content: 'One of your followed store adds a new article!',
    receivers: receivers,
    sender: sender,
    readBy: readBy
  }
  return notify;
}

interface NotificationDoc extends Document, Notification {}

const notificationSchema = new mongoose.Schema({
  heading: String,
  content: String,
  receivers: [{
    type: ObjectId,
    ref: 'User'
  }],
  sender: {
    type: ObjectId,
    ref: 'Store',
    required: false
  },
  readBy: [{
    readAt: {
      type: Date,
      default: () => new Date()
    },
    user: {
      type: ObjectId,
      ref: 'User'
    }
  }],
  createdAt: {
    type: Date,
    default: () => new Date()
  }
});

export { NotificationDoc, Notification, PairUserDate, notificationNewProduct };

export default mongoose.model<NotificationDoc>('Notifications', notificationSchema);
