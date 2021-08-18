import { Request, Response, NextFunction } from 'express';
import User from '../models/userModel';
import AppError from '../utils/appError';
import catchAsync from '../utils/catchAsync';

class UserController {
  updateMe = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    if (req.body.password || req.body.passwordConfirm) {
      next(new AppError('This route is not for password updates. Please use /updateMyPassword.', 400));
      return;
    }

    const { email, name } = req.body;
    const userId = (req as any).user.id;

    const updatedUser = await User.findByIdAndUpdate(userId, { name, email }, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: { user: updatedUser },
    });
  });

  getAllUsers = async (req: Request, res: Response) => {
    const users = await User.find();
    res.status(200).json({
      status: 'success',
      results: users.length,
      data: { users },
    });
  };

  getUser = (req: Request, res: Response) => {
    res.status(500).json({
      status: 'error',
      message: 'This route is not yet defined!',
    });
  };

  createUser = (req: Request, res: Response) => {
    res.status(500).json({
      status: 'error',
      message: 'This route is not yet defined!',
    });
  };

  updateUser = (req: Request, res: Response) => {
    res.status(500).json({
      status: 'error',
      message: 'This route is not yet defined!',
    });
  };

  deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      next(new AppError('No user found with that ID', 404));
      return;
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  };
}

export default UserController;
