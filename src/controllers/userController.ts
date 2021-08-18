import { Request, Response, NextFunction } from 'express';
import User from '../models/userModel';
import AppError from '../utils/appError';

class UserController {
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
