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
    heading: 'New product',
    content: 'One of your followed store added a new article!',
    receivers,
    sender,
    readBy
  };
  return notify;
}

function notificationNewOrder(receivers: string[], readBy: PairUserDate[]) {
  const notify: Notification = {
    heading: 'New order',
    content: 'A client has required a reservation!',
    receivers,
    readBy
  };
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

export {
  NotificationDoc, Notification, PairUserDate, notificationNewProduct, notificationNewOrder
};

export default mongoose.model<NotificationDoc>('Notifications', notificationSchema);
