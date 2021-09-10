import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import articleModel from '../models/articles/articleModel';
import Order from '../models/order';
import catchAsync from '../utils/catchAsync';
import OrderModel, { OrderDoc } from '../models/orderModel';
import HandlerFactory from './helpers/handlerFactory';
import AppError from '../utils/appError';

const factory = new HandlerFactory<OrderDoc>();

class OrderController {
  addOrder = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const order: Order = req.body;
    order.customerId = req.params.id;

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

  getStorePopularProducts = catchAsync(async (req: Request, res: Response) => {
    const storeObjectId = mongoose.Types.ObjectId(req.params.id);
    const stats = await OrderModel.aggregate([
      {
        $match: { store: storeObjectId, sold: false }
      },
      {
        $lookup: {
          from: 'articledetails', // collection foreign
          localField: 'articleDetails', // order.articleDetailsId
          foreignField: '_id', // articleDetailsCollection._id
          as: 'ad' // lo tira fuori come array, quindi forse è per quello che non riesce ad accederci
        }
      },
      { $unwind: '$ad' },
      {
        $group:
        {
          _id: '$nameArticle',
          numberOfArticleSold: { $sum: 1 },
          brandArticle: { $first: '$brandArticle' }
        }
      },
      { $sort: { numberOfArticleSold: -1 } },
      { $limit: 5 }
    ]);
    res.status(200).json({
      status: 'success',
      data: stats
    });
  });

  getStoreSalesPerDay = catchAsync(async (req: Request, res: Response) => {
    const storeObjectId = mongoose.Types.ObjectId(req.params.id);
    const stats = await OrderModel.aggregate([
      {
        $match: { store: storeObjectId, sold: false },
      },
      {
        $lookup: {
          from: 'articledetails', // collection foreign
          localField: 'articleDetails', // order.articleDetailsId
          foreignField: '_id', // articleDetailsCollection._id
          as: 'ad' // lo tira fuori come array, quindi forse è per quello che non riesce ad accederci
        }
      },
      { $unwind: '$ad' },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$bookDate' } },
          numberOfOrdersDay: { $sum: 1 },
          totalPriceOrdersDay: { $sum: '$ad.price' }
        }
      },
    ]);
    res.status(200).json({
      status: 'success',
      data: stats
    });
  });

  getOrder = factory.getOne(OrderModel, ['Customer', 'Seller', 'ArticleDetails']);

  getAllOrders = factory.getAll(OrderModel, {});

  updateOrder = factory.updateOne(OrderModel);

  deleteOrder = factory.deleteOne(OrderModel);
}

export default OrderController;
