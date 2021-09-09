import { NextFunction, Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import catchAsync from '../utils/catchAsync';
import HandlerFactory from './helpers/handlerFactory';
import StoreModel, { StoreDoc } from '../models/storeModel';
import SellerModel from '../models/users/sellerModel';
import Store from '../models/store';
import AppError from '../utils/appError';

const factory = new HandlerFactory<StoreDoc>();

class StoreController {
  addStore = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const store : Store = req.body;
    console.log(req.params.id);
    const seller = await SellerModel.findById(new ObjectId(req.params.id));
    console.log(seller);
    if (!seller) {
      next(new AppError('No seller found with that ID', 404));
      return;
    }
    const newStore = await StoreModel.create(store);
    seller?.stores.push(newStore.id);
    seller?.save();
    res.status(200).json({
      status: 'success',
      data: { newStore, seller }
    });
  });

  getStore = factory.getOne(StoreModel);

  getAllStores = factory.getAll(StoreModel, {});

  updateStore = factory.updateOne(StoreModel);

  deleteStore = factory.deleteOne(StoreModel);
}

export default StoreController;
