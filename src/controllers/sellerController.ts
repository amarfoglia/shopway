import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import HandlerFactory from './helpers/handlerFactory';
import SellerModel, { SellerDoc } from '../models/sellerModel';
import AppError from '../utils/appError';

const factory = new HandlerFactory<SellerDoc>();

class SellerController {
  addStore = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { store } = req.body;
    const seller = await SellerModel.findById(req.params.id);
    if (!seller) {
      next(new AppError('No seller found with that ID', 404));
      return;
    }
    seller?.store.push(store);
    res.status(200).json({
      status: 'success',
      data: { data: seller }
    });
  });

  getStore = factory.getOne(SellerModel);

  getAllStores = factory.getAll(SellerModel, {});

  updateStore = factory.updateOne(SellerModel);

  deleteStore = factory.deleteOne(SellerModel);
}

export default SellerController;
