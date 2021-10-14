interface Notification {
  _id: string;
  heading: string;
  content: string;
  sender?: string;
  createdAt: Date;
  readBy: {
    readAt?: Date;
    user: string;
  }[];
}

export default Notification;
