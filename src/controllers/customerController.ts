import { NextFunction, Request, Response } from 'express';
import AppError from '../utils/appError';
import catchAsync from '../utils/catchAsync';
import HandlerFactory from './helpers/handlerFactory';
import CustomerModel, { CustomerDoc } from '../models/users/customerModel';

const factory = new HandlerFactory<CustomerDoc>('customer');

class CustomerController {
  addFollowers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const followerList: string[] = req.body;
    const customer = await CustomerModel.findById(req.user?.id);
    if (!customer || customer === undefined) {
      next(new AppError('Invalid customer ID', 400));
    }
    followerList.forEach((storeId) => {
      if (!customer?.followerList.includes(storeId)) {
        customer?.followerList.push(storeId);
      }
    });
    res.status(201).json({
      status: 'success',
      data: { customer }
    });
  });

  getFollowers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const customer = await CustomerModel.findById(req.params.id);
    if (!customer || customer === undefined) {
      next(new AppError('Invalid customer ID', 400));
    }
    const followerList = customer?.followerList;
    res.status(200).json({
      status: 'success',
      data: { followers: followerList }
    });
  });

  getCustomer = factory.getOne(CustomerModel);

  getAllCustomer = factory.getAll(CustomerModel, {});

  updateCustomer = factory.updateOne(CustomerModel);

  deleteCustomer = factory.deleteOne(CustomerModel);
}

export default CustomerController;
