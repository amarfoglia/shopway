import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import OrderModel, { OrderDoc } from '../models/orderModel';
import HandlerFactory from './helpers/handlerFactory';
import AppError from '../utils/appError';

const factory = new HandlerFactory<OrderDoc>('order');

class OrderController {
  addOrder = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const order: OrderDoc = req.body;
    order.customer = req.user?.id;

    if (!req.user) {
      next(new AppError('the id of customer is not defined', 400));
    }

    const newOrder = await OrderModel.create(order);

    if (!newOrder) {
      next(new AppError('Cannot create the order', 500));
    }

    res.status(201).json({
      status: 'success',
      data: { order: newOrder }
    });
  });

  getOrder = factory.getOne(OrderModel);

  getAllOrders = factory.getAll(OrderModel, {});

  updateOrder = factory.updateOne(OrderModel);

  deleteOrder = factory.deleteOne(OrderModel);
}

export default OrderController;
