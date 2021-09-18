import { NextFunction, Request, Response } from 'express';
import userModel from '../models/users/userModel';
import Role from '../models/role';
import sellerModel from '../models/users/sellerModel';
import catchAsync from '../utils/catchAsync';
import OrderModel, { OrderDoc } from '../models/orderModel';
import HandlerFactory from './helpers/handlerFactory';
import AppError from '../utils/appError';

const factory = new HandlerFactory<OrderDoc>('order');

class OrderController {
  addOrder = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const order: OrderDoc = req.body;
    order.customer = req.user?.id;

    if (!order.customer) {
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

  updateOrder = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id;
    const orderId = req.params.id;
    const order = await OrderModel.findById(orderId);
    if (!order) {
      next(new AppError('Invalid orderId', 400));
    }
    if (req.user?.role === Role.SELLER) {
      const seller = await sellerModel.findById(userId);
      if (!seller?.stores.includes(order?.storeId ?? 'invalid-id')) {
        next(new AppError('You are not authorised to modify an order that does not belong to your store.', 400));
        return;
      }
      if (order) {
        order.sold = true;
        order?.save();
      }
      res.status(201).json({
        status: 'success',
        data: { order }
      });
    }
  });

  deleteOrder = factory.deleteOne(OrderModel);
}

export default OrderController;
