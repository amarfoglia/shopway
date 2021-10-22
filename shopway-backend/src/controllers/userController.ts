import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import UserModel, { UserDoc } from '../models/users/userModel';
import StoreModel from '../models/storeModel';
import AppError from '../utils/appError';
import catchAsync from '../utils/catchAsync';
import HandlerFactory from './helpers/handlerFactory';
import { setPhoto } from './helpers/imageController';

const factory = new HandlerFactory<UserDoc>('user');

class UserController {
  getMe = (req: Request, _: Response, next: NextFunction) => {
    req.params.id = req.user?.id || 'invalid-id';
    next();
  };

  updateMe = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    if (req.body.password || req.body.passwordConfirm) {
      next(new AppError('This route is not for password updates. Please use /updateMyPassword.', 400));
      return;
    }

    const { user, file } = req;
    let photo;

    if (user?.role === 'Seller') {
      photo = file && await setPhoto('logo'.concat('-', uuidv4()), 'public/img/stores', file);
      await StoreModel.findByIdAndUpdate(user?.stores?.[0], { logo: photo });
    } else {
      photo = file && await setPhoto('photo'.concat('-', uuidv4()), 'public/img/users', file);
    }

    const userToUpdate = photo ? { ...req.body, photo } : req.body;
    const updatedUser = await UserModel.findByIdAndUpdate(user?.id, userToUpdate, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      status: 'success',
      data: { user: updatedUser }
    });
  });

  deleteMe = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user.id;
    await UserModel.findByIdAndUpdate(userId, { active: false });
    res.status(204).json({
      status: 'success',
      data: null
    });
  })

  createUser = (_: Request, res: Response) => {
    res.status(500).json({
      status: 'error',
      message: 'This route is not yet defined!'
    });
  }

  getUser = factory.getOne(UserModel);

  getAllUsers = factory.getAll(UserModel, {});

  updateUser = factory.updateOne(UserModel);

  deleteUser = factory.deleteOne(UserModel);
}

export default UserController;
