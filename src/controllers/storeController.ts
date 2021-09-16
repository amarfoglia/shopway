import { NextFunction, Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
import { addDays, startOfWeek } from 'date-fns';
import { it } from 'date-fns/locale';
import UserModel from '../models/users/userModel';
import OrderModel from '../models/orderModel';
import catchAsync from '../utils/catchAsync';
import HandlerFactory from './helpers/handlerFactory';
import StoreModel, { StoreDoc } from '../models/storeModel';
import SellerModel from '../models/users/sellerModel';
import Store from '../models/store';
import AppError from '../utils/appError';
import VisitStoreModel, { StoreVisitDoc } from '../models/visitStoreModel';

const factory = new HandlerFactory<StoreDoc>('store');
const SIX_DAYS = 6;
function isEmpty(arr: StoreVisitDoc[]): Boolean {
  return (arr.length === 0);
}

class StoreController {
  addStore = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const store : Store = req.body;
    const seller = await SellerModel.findById(new ObjectId(req.params.id));

    if (!seller) {
      next(new AppError('No seller found with that ID', 404));
      return;
    }
    store.logo = `logo-${seller.fullName}-${store.name}-${new Date()}.jpeg`;
    await req.file?.toFile(`public/img/stores/${store.logo}`);
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
    const { storeId } = req.params;

    if (!userId || !storeId) {
      next(new AppError('invalid userId or storeId', 400));
      return;
    }
    // Mongoose Date work with year-month-day
    const today = new Date().toLocaleDateString;

    const userObjectId = mongoose.Types.ObjectId(userId);
    const storeObjectId = mongoose.Types.ObjectId(storeId);
    const newVisit = { users: [userId], date: today };
    let visit;

    const visitSearched = await VisitStoreModel.find({ storeId, 'visits.date': today });

    if (isEmpty(visitSearched)) {
      // date non c'è, oppure visits è un array vuoto. (creo nuovo visit e lo aggiungo)
      visit = await VisitStoreModel.updateOne({ storeId: storeObjectId },
        { $addToSet: { visits: newVisit } });
    } else {
      // date c'è, devo aggiungere al set l'user
      visit = await VisitStoreModel.updateOne({ storeId: storeObjectId, 'visits.date': today },
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
      data: { store, visit }
    });
  });

  // questa funzione qua sotto, potrei prendere come input due parametri startDate, endDate
  // stores/id/?&startDate

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
      data: { stats }
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
      data: { stats }
    });
  });

  updateMe = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id: storeId } = req.params;

    const seller:any = await UserModel.findById(req.user?.id);

    if (!seller?.stores.includes(storeId)) {
      next(new AppError('You do not have the permission.', 400));
      return;
    }
    const store: Store = req.body;
    store.logo = `logo-${req.user?.id}-${storeId}.jpeg`;
    await req.file?.toFile(`public/img/stores/${store.logo}`);

    const updatedStore = await StoreModel.findByIdAndUpdate(storeId, {
      ...store
    }, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      status: 'success',
      data: { store: updatedStore }
    });
  });

  // getStore = factory.getOne(StoreModel);

  getAllStores = factory.getAll(StoreModel, {});

  updateStore = factory.updateOne(StoreModel);

  deleteStore = factory.deleteOne(StoreModel);
}

export default StoreController;
