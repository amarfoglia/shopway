import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Promisify from '../utils/promisify';
import catchAsync from '../utils/catchAsync';
import User from '../models/userModel';
import AppError from '../utils/appError';

const getJwtSecret = () => (process.env.JWT_SECRET || 'secret');

const generateToken = (id: string): string => (
  jwt.sign(
    { id },
    getJwtSecret(),
    { expiresIn: process.env.JWT_EXPIRES_IN },
  )
);

const promisify = new Promisify<jwt.JwtPayload | string>();
const verifyToken = (token: string) => jwt.verify(token, getJwtSecret());

class AuthController {
  signup = catchAsync(async (req: Request, res: Response) => {
    const { role, ...user } = req.body;
    const newUser = await User.create(user);// client can't set the admin role;
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

    const user = await User.findOne({ email }).select('+password');

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

  checkUserToken = catchAsync(async (req: any, res: Response, next: NextFunction) => {
    const { token } = req.headers;
    if (!token) {
      next(new AppError('You are not logged in! Please log in to get access.', 401));
      return;
    }

    const decoded = await promisify.create(() => verifyToken(token.toString()));
    const { id, iat } = (decoded as jwt.JwtPayload);

    // check if someone are using a token owned by a removed user
    const currentUser = await User.findById(id);
    if (!currentUser) {
      next(new AppError('The user belonging to this token does no longer exist.', 401));
      return;
    }

    // check if user changed password after the token was issued
    if (currentUser.changedPasswordAfter(iat || -1)) {
      next(new AppError('User recently changed password! Please log in again.', 401));
    }

    req.user = currentUser;
    next();
  });
}

export default AuthController;
