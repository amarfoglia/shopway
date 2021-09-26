import { Request, Response, NextFunction } from 'express';
import UserModel, { UserDoc } from '../models/users/userModel';
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

    const { email, fullName } = req.body;
    const userId = req.user?.id;
    let photo;

    if (req.file) {
      const fileName = 'photo'.concat('-', req.user?.id);
      photo = await setPhoto(fileName, 'public/img/users', req.file);
    }

    const updatedUser = await UserModel.findByIdAndUpdate(userId, {
      fullName, email, photo
    }, {
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
