import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import catchAsync from '../utils/catchAsync';
import UserSchema from '../models/userModel';
import AppError from '../utils/appError';

const generateToken = (id: string): string => (
  jwt.sign(
    { id },
    process.env.JWT_SECRET || 'secret',
    { expiresIn: process.env.JWT_EXPIRES_IN },
  )
);

class AuthController {
  signup = catchAsync(async (req: Request, res: Response) => {
    const newUser = await UserSchema.create({ // client can't set the admin role
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    const token = generateToken(newUser.id);

    res.status(201).json({
      status: 'success',
      token,
      data: { user: newUser },
    });
  });

  login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
      next(new AppError('Please provide email and password!', 400));
      return;
    }

    const user = await UserSchema.findOne({ email }).select('+password');

    if (!user || !(await user.passwordMatch(password, user.password))) {
      next(new AppError('Incorrect email or password', 401));
      return;
    }

    const token = generateToken(user.id);

    res.status(200).json({
      status: 'success',
      token,
    });
  });
}

export default AuthController;
