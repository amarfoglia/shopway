import { NextFunction, Request, Response } from 'express';
import Seller from '../models/users/seller';
import Role from '../models/role';
import catchAsync from '../utils/catchAsync';
import OrderModel, { OrderDoc } from '../models/orderModel';
import HandlerFactory from './helpers/handlerFactory';
import AppError from '../utils/appError';
import SellerModel from '../models/users/sellerModel';

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
      const seller = await SellerModel.findById(userId);
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

  getCustomerOrders = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user?.id;
    let orders;
    if (req.user?.role === 'Customer') { orders = await OrderModel.find({ $match: { customer: userId } }); }
    res.status(201).json({
      status: 'success',
      data: { orders }
    });
  });

  getOrdersFromStore = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const seller = req.user as Seller;
    const storeId = req.params.id;
    if (!seller.stores.includes(storeId)) {
      next(new AppError('You are not authorised to perform this action', 400));
    }
    const orders = await OrderModel.find({ store: storeId });
    res.status(201).json({
      status: 'success',
      data: { orders }
    });
  });

  deleteOrder = factory.deleteOne(OrderModel);
}

export default OrderController;
