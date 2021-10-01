import { NextFunction, Request, Response } from 'express';
import Seller from '../models/users/seller';
import catchAsync from '../utils/catchAsync';
import OrderModel, { OrderDoc } from '../models/orderModel';
import HandlerFactory from './helpers/handlerFactory';
import AppError from '../utils/appError';
import ArticleDetailsModel from '../models/articles/articleDetailsModel';
import APIFeatures from '../utils/apiFeatures';

const factory = new HandlerFactory<OrderDoc>('order');

class OrderController {
  addOrder = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const order: OrderDoc = req.body;
    order.customer = req.user?.id;

    if (!order.customer) {
      next(new AppError('the id of customer is not defined', 400));
      return;
    }

    const newOrder = await OrderModel.create(order);

    if (!newOrder) {
      next(new AppError('Cannot create the order', 500));
      return;
    }

    res.status(201).json({
      status: 'success',
      data: { order: newOrder }
    });
  });

  getOrder = factory.getOne(OrderModel);

  getAllOrders = factory.getAll(OrderModel, {});

  updateOrder = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const orderId = req.params.id;
    const order = await OrderModel.findById(orderId);
    if (!order) {
      next(new AppError('Invalid orderId', 400));
      return;
    }
    const seller = req.user as Seller;
    if (!seller?.stores.includes(order?.storeId ?? 'invalid-id')) {
      next(new AppError('You are not authorised to modify an order that does not belong to your store.', 400));
      return;
    }
    if (order) {
      order.sold = true;
      order.save();
    }
    res.status(201).json({
      status: 'success',
      data: { order }
    });
  });

  getCustomerOrders = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const features = new APIFeatures(OrderModel.find({ customer: userId }), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const orders = await features.query;
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
      return;
    }
    const features = new APIFeatures(OrderModel.find({ store: storeId }), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const orders = await features.query;
    res.status(201).json({
      status: 'success',
      data: { orders }
    });
  });

  deleteOrder = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const orderId = req.params.id;
    const deleteOrder = await OrderModel.findByIdAndDelete(orderId);
    const update = { $inc: { 'stockArticles.$[e].quantity': 1 } };
    const filter = { _id: deleteOrder?.articleDetails };
    const options = { arrayFilters: [{ 'e.size': deleteOrder?.size }] };
    const result: any = await ArticleDetailsModel.updateOne(filter, update, options);
    if (result.nModified === 0) {
      next(new AppError('impossible increment stockArticles quantity', 500));
      return
    }
    res.status(204).json({
      status: 'success',
      data: null
    });
  });
}

export default OrderController;
