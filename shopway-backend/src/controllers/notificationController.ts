import {
  NextFunction, Request, Response
} from 'express';
import AppError from '../utils/appError';
import catchAsync from '../utils/catchAsync';
import NotificationModel, { Notification } from '../models/notificationModel';

class NotificationController {
  getNotificationsOfUser = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const notifications = await NotificationModel.find({ receivers: userId }).sort('-createdAt');

    res.status(200).json({
      status: 'success',
      count: notifications.length,
      data: { notifications }
    });
  })

  updateNotificationsOfUser = catchAsync(async (req: Request, res: Response,
    next: NextFunction) => {
    const notification = await NotificationModel.findById(req.params.id);
    if (!notification) {
      next(new AppError("Notifications doesn't exist", 404));
    }
    const notify = notification?.readBy.filter((n) => n.user.toString() === req.user.id.toString());
    const isNotifySeen = notify && notify.length > 0;
    if (!isNotifySeen) {
      const notified = { user: req.user.id };
      notification?.readBy.push(notified);
      notification?.save();
    }
    res.status(201).json({
      status: 'success',
      data: { notification }
    });
  });
}
export default NotificationController;
