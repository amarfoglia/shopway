import { NextFunction, query, Request, Response } from 'express';
import { Types } from 'mongoose';
import { Socket } from 'socket.io-client';
import AppError from '../utils/appError';
import catchAsync from '../utils/catchAsync';
import NotificationModel, { Notification, NotificationDoc } from '../models/notificationModel';
import APIFeatures from '../utils/apiFeatures';

class NotificationController {
  getNotificationsOfUser = catchAsync(async (req: Request, res: Response,
    next: NextFunction) => {
    const userId = req.user?.id;
    console.log(userId);
    const notificationsUser = await NotificationModel.find({ receivers: userId });
    const notificationsUserDisplay = notificationsUser.flatMap((n:Notification) => ({
      _id: n.id,
      title: n.heading,
      sender: n.sender,
      receivers: n.receivers,
      readBy: n.readBy.some((x) => x.user.toString() === userId.toString())
    }))

    res.status(200).json({
      status: 'success',
      count: notificationsUserDisplay.length,
      data: notificationsUserDisplay
    })
  })

  updateNotificationsOfUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const notification = await NotificationModel.findById(req.params.id);
    if(!notification) {
      next(new AppError("Notifications doesn't exist", 404));
    }
    const notify = notification?.readBy.filter((notify) => notify.user === req.user.id);
    const isNotifySeen = notify && notify.length > 0;
    if(!isNotifySeen) {
      const notified = { user: req.user.id }
      notification?.readBy.push(notified);
      notification?.save();
    }
    res.status(201).json({
      status: 'success',
      data: notification
    })
  });
}
export default NotificationController;
