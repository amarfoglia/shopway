import { NextFunction, Request, Response } from 'express';
import AppError from '../utils/appError';
import catchAsync from '../utils/catchAsync';
import CustomerModel from '../models/users/customerModel';
import OrderModel from '../models/orderModel';
import Customer from '../models/users/customer';

const updateFollowers = async (req: Request, res: Response, next: NextFunction,
  storeId: string, update: Object) => {
  const { user } = req;
  if (!user.id) {
    next(new AppError('Invalid customer ID', 400));
    return;
  }

  const customer = await CustomerModel.findByIdAndUpdate(user.id, update, { new: true });

  res.status(201).json({
    status: 'success',
    data: { user: customer }
  });
};

class CustomerController {
  addFollower = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { storeId } = req.body;
    await updateFollowers(req, res, next, storeId, { $addToSet: { followerList: storeId } });
  });

  removeFollower = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const storeId = req.params.id;
    await updateFollowers(req, res, next, storeId, { $pull: { followerList: storeId } });
  });

  getFollowers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const customer = req.user as Customer;
    if (!customer) {
      next(new AppError('Invalid customer ID', 400));
      return;
    }
    const followers = await CustomerModel.findOne({ _id: customer.id });
    res.status(200).json({
      status: 'success',
      data: followers
    });
  });

  getUserNumberOfOrders = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const customerId = req.user?.id ?? 'invalid-id';
    if (customerId === 'invalid-id') {
      next(new AppError('customer id is not valid', 400));
      return;
    }
    const query = await OrderModel.countDocuments({ customer: customerId });
    res.status(200).json({
      status: 'success',
      data: {
        stats: {
          numberOfOrders: query
        }
      }
    });
  });
}

export default CustomerController;
