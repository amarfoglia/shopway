import { NextFunction, Request, Response } from 'express';
import Order from '../models/order';
import catchAsync from '../utils/catchAsync';
import OrderModel, { OrderDoc } from '../models/orderModel';
import HandlerFactory from './helpers/handlerFactory';
import AppError from '../utils/appError';

const factory = new HandlerFactory<OrderDoc>();

class OrderController {
  addOrder = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const order: Order = req.body;
    order.customerId = req.user?.id;

    if (!order.customerId) {
      next(new AppError('the id of customer is not defined', 400));
    }

    const newOrder = await OrderModel.create(order);

    if (!newOrder) {
      next(new AppError('Cannot create the order', 500));
    }

    res.status(201).json({
      status: 'success',
      data: { newOrder }
    });
  });

  getOrder = factory.getOne(OrderModel);

  getAllOrders = factory.getAll(OrderModel, {});

  updateOrder = factory.updateOne(OrderModel);

  deleteOrder = factory.deleteOne(OrderModel);
}

export default OrderController;
