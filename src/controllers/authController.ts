import { Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import User from '../models/userModel';

class AuthController {
  signup = catchAsync(async (req: Request, res: Response) => {
    const newUser = await User.create(req.body);
    res.status(201).json({
      status: 'success',
      data: { user: newUser },
    });
  });
}

export default AuthController;
