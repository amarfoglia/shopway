import { NextFunction, Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { addDays, startOfWeek } from 'date-fns';
import { it } from 'date-fns/locale';
import OrderModel from '../models/orderModel';
import catchAsync from '../utils/catchAsync';
import HandlerFactory from './helpers/handlerFactory';
import StoreModel, { StoreDoc } from '../models/storeModel';
import SellerModel from '../models/users/sellerModel';
import Store from '../models/store';
import AppError from '../utils/appError';
import VisitStoreModel, { StoreVisitDoc } from '../models/visitStoreModel';
import { setPhoto } from './helpers/imageController';

const factory = new HandlerFactory<StoreDoc>('store');
const SIX_DAYS = 6;
function isEmpty(arr: StoreVisitDoc[]): Boolean {
  return (arr.length === 0);
}

class StoreController {
  addStore = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const store : Store = req.body;
    const seller = await SellerModel.findById(new ObjectId(req.user?.id));

    if (!seller) {
      next(new AppError('No seller found with that ID', 404));
      return;
    }

    store.logo = await setPhoto('logo', [uuidv4(), new Date().getTime().toString()], 'public/img/stores', req, next);

    const newStore = await StoreModel.create(store);
    const visitObj = { storeId: newStore.id, visits: [] };
    await VisitStoreModel.create(visitObj);
    seller?.stores.push(newStore.id);
    seller?.save();
    res.status(200).json({
      status: 'success',
      data: { store: newStore, seller }
    });
  });

  getStore = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id;
    const storeId = req.params.id;

    if (!userId || !storeId) {
      next(new AppError('invalid userId or storeId', 400));
      return;
    }

    const date = new Date();
    const today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const userObjectId = mongoose.Types.ObjectId(userId);
    const storeObjectId = mongoose.Types.ObjectId(storeId);
    const newVisit = { users: [userId], date: today };

    const visitSearched = await VisitStoreModel.find({ storeId, 'visits.date': today });

    if (isEmpty(visitSearched)) {
      await VisitStoreModel.updateOne({ storeId: storeObjectId },
        { $addToSet: { visits: newVisit } });
    } else {
      await VisitStoreModel.updateOne({ storeId: storeObjectId, 'visits.date': today },
        {
          $addToSet: { 'visits.$.users': userObjectId }
        });
    }
    const store = await StoreModel.findById(storeId);
    if (!store) {
      next(new AppError('invalid store id', 404));
    }
    res.status(200).json({
      success: 'success',
      data: { store }
    });
  });

  getWiewsStats = catchAsync(async (req: Request, res: Response) => {
    const { id: storeId } = req.params;
    const { startDate, endDate } = req.query as any;
    let first;
    let last;

    if (!startDate && !endDate) {
      first = startOfWeek(new Date(), { weekStartsOn: 1, locale: it });
      last = addDays(first, SIX_DAYS);
    } else {
      first = new Date(startDate);
      last = new Date(endDate);
    }
    const visit = await VisitStoreModel.aggregate([
      {
        $match: {
          storeId: mongoose.Types.ObjectId(storeId)
        }
      },
      { $unwind: '$visits' },
      { $match: { 'visits.date': { $gte: first, $lte: last } } },
      { $unwind: '$visits.users' },
      {
        $group: {
          _id: '$visits.date',
          numberOfViews: { $count: {} }
        }
      }
    ]);
    res.status(200).json({
      success: 'success',
      data: { visit }
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
          from: 'articledetails',
          localField: 'articleDetails',
          foreignField: '_id',
          as: 'ad'
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
      data: { stats }
    });
  });

  getStoreSalesPerDay = catchAsync(async (req: Request, res: Response) => {
    // remember to add startDate endDate filter.
    const storeObjectId = mongoose.Types.ObjectId(req.params.id);
    const stats = await OrderModel.aggregate([
      {
        $match: { store: storeObjectId, sold: false },
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$bookDate' } },
          numberOfOrders: { $sum: 1 },
          profit: { $sum: '$totalPrice' }
        }
      },
    ]);
    res.status(200).json({
      status: 'success',
      data: { stats }
    });
  });

  updateStore = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id: storeId } = req.params;

    const seller = await SellerModel.findById(req.user?.id);

    const newStore: Store = req.body;
    if (req.file) {
      newStore.logo = await setPhoto('logo', [req.user?.id, storeId], 'public/img/stores', req, next);
    }
    const updatedStore = await StoreModel.updateOne(
      { $and: [{ _id: storeId }, { _id: { $in: seller?.stores } }] },
      { ...newStore },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      status: 'success',
      data: { store: updatedStore }
    });
  });

  getAllStores = factory.getAll(StoreModel, {});

  deleteStore = factory.deleteOne(StoreModel);
}

export default StoreController;
