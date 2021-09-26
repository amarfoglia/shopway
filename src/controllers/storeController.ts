import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { addDays, startOfWeek } from 'date-fns';
import { it } from 'date-fns/locale';
import ArticleModel from '../models/articles/articleModel';
import Seller from '../models/users/seller';
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
    const seller = req.user as Seller;

    if (!seller) {
      next(new AppError('No seller found with that ID', 404));
      return;
    }

    if (req.file) {
      const fileName = 'logo'.concat('-', uuidv4());
      store.logo = await setPhoto(fileName, 'public/img/stores', req.file);
    }

    const newStore = await StoreModel.create(store);
    const visitObj = { storeId: newStore.id, visits: [] };
    await VisitStoreModel.create(visitObj);
    await SellerModel.updateOne(
      { _id: seller.id },
      { $addToSet: { stores: newStore.id } }
    );
    res.status(200).json({
      status: 'success',
      data: { store: newStore }
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
        { $addToSet: { visits: newVisit } },
        { new: true, upsert: true, setDefaultsOnInsert: true });
    } else {
      await VisitStoreModel.updateOne({ storeId: storeObjectId, 'visits.date': today },
        {
          $addToSet: { 'visits.$.users': userObjectId }
        });
    }
    const store = await StoreModel.findById(storeId);
    if (!store) {
      next(new AppError('invalid store id', 404));
      return;
    }
    res.status(200).json({
      success: 'success',
      data: { store }
    });
  });

  getStatsStore = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id: storeId } = req.params;
    const { startDate, endDate } = req.query as any;
    let first;
    let last;
    const seller = req.user as Seller;

    if (!seller.stores.includes(storeId)) {
      next(new AppError('this store does not belong to the seller.', 400));
      return;
    }

    if (!startDate && !endDate) {
      first = startOfWeek(new Date(), { weekStartsOn: 1, locale: it });
      last = addDays(first, SIX_DAYS);
    } else {
      first = new Date(startDate);
      last = new Date(endDate);
    }
    const viewsStore = await this.getViewsOfStore(storeId, first, last);
    const salesStore = await this.getSalesOfStore(storeId, first, last);
    const numberOfArticles = await this.getNumberOfStoreArticles(storeId);
    res.status(200).json({
      success: 'success',
      data: { stats: { viewsStore, salesStore, numberOfArticles } }
    });
  });

  getNumberOfStoreArticles = async (storeId: string) => {
    const numberOfArticles = await ArticleModel.find({ store: storeId }).count();
    return numberOfArticles;
  };

  getViewsOfStore = async (storeId: string, startDate: Date, endDate: Date) => {
    const visits = await VisitStoreModel.aggregate([
      {
        $match: {
          storeId: mongoose.Types.ObjectId(storeId)
        }
      },
      { $unwind: '$visits' },
      { $match: { 'visits.date': { $gte: startDate, $lte: endDate } } },
      { $unwind: '$visits.users' },
      {
        $group: {
          _id: '$visits.date',
          numberOfViews: { $count: {} }
        }
      }
    ]);
    return visits;
  };

  getSalesOfStore = async (storeId: string, startDate: Date, endDate: Date) => {
    const storeObjectId = mongoose.Types.ObjectId(storeId);
    const sales = await OrderModel.aggregate([
      {
        $match: { store: storeObjectId, sold: false, bookDate: { $gte: startDate, $lte: endDate } }
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$bookDate' } },
          numberOfOrders: { $sum: 1 },
          profit: { $sum: '$totalPrice' }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);
    return sales;
  };

  getStorePopularProducts = catchAsync(async (req: Request, res: Response) => {
    const storeId = req.params.id;
    const storeObjectId = mongoose.Types.ObjectId(storeId);
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
          _id: '$_id',
          numberOfArticleSold: { $sum: 1 }
        }
      },
      { $sort: { numberOfArticleSold: -1 } },
      { $limit: 5 }
    ]);
    const articlesId = stats.flatMap((x) => x.id);
    const articles = ArticleModel.find({ store: storeId, _id: { $in: articlesId } });
    res.status(200).json({
      status: 'success',
      data: { articles }
    });
  });

  updateStore = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id: storeId } = req.params;

    const seller = req.user as Seller;

    if (!seller.stores.includes(storeId)) {
      next(new AppError('the store does not belong to the seller', 400));
      return;
    }

    const newStore: Store = req.body;

    if (req.file) {
      const fileName = 'logo'.concat('-', req.user?.id, '-', storeId);
      newStore.logo = await setPhoto(fileName, 'public/img/stores', req.file);
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
