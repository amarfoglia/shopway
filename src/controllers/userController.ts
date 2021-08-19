import { Request, Response, NextFunction } from 'express';
import User from '../models/userModel';
import IUser from '../models/user';
import AppError from '../utils/appError';
import catchAsync from '../utils/catchAsync';
import HandlerFactory from './handlerFactory';

const factory = new HandlerFactory<IUser>();

class UserController {
  getMe = (req: Request, _: Response, next: NextFunction) => {
    req.params.id = (req as any).user.id;
    next();
  };

  updateMe = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    if (req.body.password || req.body.passwordConfirm) {
      next(new AppError('This route is not for password updates. Please use /updateMyPassword.', 400));
      return;
    }

    const { email, name } = req.body;
    const userId = (req as any).user.id;

    const updatedUser = await User.findByIdAndUpdate(userId, { name, email }, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      status: 'success',
      data: { user: updatedUser }
    });
  });

  deleteMe = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    await User.findByIdAndUpdate(userId, { active: false });

    res.status(204).json({
      status: 'success',
      data: null
    });
  })

  createUser = (req: Request, res: Response) => {
    res.status(500).json({
      status: 'error',
      message: 'This route is not yet defined!'
    });
  }

  getUser = factory.getOne(User);

  getAllUsers = factory.getAll(User, {});

  updateUser = factory.updateOne(User);

  deleteUser = factory.deleteOne(User);
}

export default UserController;
