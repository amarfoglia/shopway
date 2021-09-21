import { NextFunction, Request, Response } from 'express';
import AppError from '../utils/appError';
import catchAsync from '../utils/catchAsync';
import HandlerFactory from './helpers/handlerFactory';
import CustomerModel, { CustomerDoc } from '../models/users/customerModel';
import OrderModel from '../models/orderModel';
import Customer from '../models/users/customer';

const factory = new HandlerFactory<CustomerDoc>('customer');

class CustomerController {
  addFollowers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { followerList } = req.body;
    const customer = req.user as Customer;

    if (!customer) {
      next(new AppError('Invalid customer ID', 400));
      return;
    }

    await CustomerModel.updateOne(
      { _id: customer.id },
      { $addToSet: { followerList } }
    );
    res.status(201).json({
      status: 'success',
      data: null
    });
  });

  getFollowers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const customer = req.user as Customer;
    if (!customer) {
      next(new AppError('Invalid customer ID', 400));
      return;
    }
    const followers = await CustomerModel.find({ _id: customer.id }, 'followerList');
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
    const query = await OrderModel.count({ customer: customerId });
    res.status(200).json({
      status: 'success',
      data: {
        stats: {
          numberOfOrders: query
        }
      }
    });
  });

  getCustomer = factory.getOne(CustomerModel);

  getAllCustomer = factory.getAll(CustomerModel, {});

  updateCustomer = factory.updateOne(CustomerModel);

  deleteCustomer = factory.deleteOne(CustomerModel);
}

export default CustomerController;
