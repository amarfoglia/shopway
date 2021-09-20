import { NextFunction, Request, Response } from 'express';
import AppError from '../utils/appError';
import catchAsync from '../utils/catchAsync';
import HandlerFactory from './helpers/handlerFactory';
import CustomerModel, { CustomerDoc } from '../models/users/customerModel';
import OrderModel from '../models/orderModel';

const factory = new HandlerFactory<CustomerDoc>('customer');

class CustomerController {
  addFollowers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { followerList } = req.body;
    const customer = await CustomerModel.findById(req.user?.id);
    if (!customer || customer === undefined) {
      next(new AppError('Invalid customer ID', 400));
    }
    followerList.forEach((storeId: string) => {
      if (!customer?.followerList.includes(storeId)) {
        customer?.followerList.push(storeId);
      }
    });
    customer?.save();
    res.status(201).json({
      status: 'success',
      data: { customer }
    });
  });

  getFollowers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const customer = await CustomerModel.findById(req.user?.id);
    if (!customer) {
      next(new AppError('Invalid customer ID', 400));
    }
    const followers = await CustomerModel.aggregate([
      {
        $match: {
          _id: customer?.id
        }
      },
      {
        $lookup: {
          from: 'stores',
          localField: 'followerList',
          foreignField: '_id',
          as: 'store'
        }
      },
      { $unwind: '$store' }
    ]);
    res.status(200).json({
      status: 'success',
      data: { followers }
    });
  });

  getUserStats = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const customerId = req.user?.id ?? 'invalid-id';
    if (customerId === 'invalid-id') {
      next(new AppError('customer id is not valid', 400));
    }
    const query = await OrderModel.count({ $match: { customer: customerId } });
    res.status(200).json({
      status: 'success',
      data: { stats: query }
    });
  });

  getCustomer = factory.getOne(CustomerModel);

  getAllCustomer = factory.getAll(CustomerModel, {});

  updateCustomer = factory.updateOne(CustomerModel);

  deleteCustomer = factory.deleteOne(CustomerModel);
}

export default CustomerController;
