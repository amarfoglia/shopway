import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import Cookies from 'universal-cookie';
import Role from '../models/role';
import Promisify from '../utils/promisify';
import catchAsync from '../utils/catchAsync';
import UserModel from '../models/users/userModel';
import User from '../models/users/user';
import AppError from '../utils/appError';
import sendEmail from '../utils/email';
import { ONE_DAY_IN_MS } from '../utils/time';
import CustomerModel from '../models/users/customerModel';
import SellerModel from '../models/users/sellerModel';
import StoreModel from '../models/storeModel';
import VisitStoreModel from '../models/visitStoreModel';
import Customer from '../models/users/customer';
import { setPhoto } from './helpers/imageController';
import Store from '../models/store';
import Seller from '../models/users/seller';

const getJwtSecret = () => (process.env.JWT_SECRET || 'invalid-token');

const generateToken = (id: string): string => jwt.sign(
  { id },
  getJwtSecret(),
  { expiresIn: process.env.JWT_EXPIRES_IN }
);

const sendFreshToken = (user: User | Customer | Seller, statusCode: number, res: Response) => {
  const token = generateToken(user.id ?? 'invalid-id');
  const cookieOptions = {
    expires: new Date(Date.now() + Number(process.env.JWT_COOKIE_EXPIRES_IN) * ONE_DAY_IN_MS),
    httpOnly: true, // prevent cross-site scripting attack
    secure: process.env.NODE_ENV === 'production'
  };

  res.cookie('jwt', token, cookieOptions);
  /*
  const {
    fullName, email, photo, role
  } = user; // exclude password
*/
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user/* {
        fullName, email, photo, role
      } */
    }
  });
};

const promisify = new Promisify<jwt.JwtPayload | string>();
const verifyToken = (token: string) => jwt.verify(token, getJwtSecret());

const createCustomer = async (customer: Customer, file: any) => {
  const filename = 'photo'.concat('-', uuidv4());
  const photo = file && await setPhoto(filename, 'public/img/users', file);
  return CustomerModel.create({ ...customer, photo });
};

const createStore = async (store: Store, file?: any) => {
  const logo = file && await setPhoto('logo'.concat('-', uuidv4()), 'public/img/stores', file);
  return StoreModel.create({ ...store, logo });
};

const createSeller = async (seller: Seller, store: Store, file: any) => {
  const storeDoc = await createStore(store, file);
  await VisitStoreModel.create({ storeId: storeDoc.id, visits: [] });
  return SellerModel.create({ ...seller, stores: [storeDoc.id] });
};

class AuthController {
  signup = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { store, ...user } = req.body;
    let newUser;
    if (user.role === 'Customer') {
      newUser = await createCustomer(user, req.file);
    } else if (user.role === 'Seller') {
      newUser = await createSeller(user, store, req.file);
    }
    if (!newUser) {
      next(new AppError('Please provide a valid role!', 400));
      return;
    }
    sendFreshToken(newUser, 201, res);
  });

  login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
      next(new AppError('Please provide email and password!', 400));
      return;
    }

    const user = await UserModel.findOne({ email }).select('+password');

    if (!user || !(await user.passwordMatch(password, user.password))) {
      next(new AppError('Incorrect email or password', 401));
      return;
    }
    /*
    const doc = user.role === Role.SELLER
      ? await SellerModel.findById(user.id).select('+password')
      : await CustomerModel.findById(user.id).select('+password'); */

    if (user) {
      sendFreshToken(user, 200, res);
    }
  });

  logout = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    res.cookie('jwt', 'none', {
      expires: new Date(Date.now() + (5*1000)),
      httpOnly: true,
    });
    res.status(200).json({
      status: 'success',
      data: null
    });
  });

  checkUserToken = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { authorization, cookie } = req.headers;
    const token = new Cookies(cookie).get('jwt')
      ?? (authorization?.startsWith('Bearer') && authorization.split(' ')[1]);
    if (!token) {
      next(new AppError('You are not logged in! Please log in to get access.', 401));
      return;
    }

    const decoded = await promisify.create(() => verifyToken(token));
    const { id, iat } = (decoded as jwt.JwtPayload);

    // check if someone are using a token owned by a removed user
    const currentUser = await UserModel.findById(id);
    if (!currentUser) {
      next(new AppError('The user belonging to this token does no longer exist.', 401));
      return;
    }

    // check if user changed password after the token was issued
    if (currentUser.changedPasswordAfter(iat || -1)) {
      next(new AppError('User recently changed password! Please log in again.', 401));
      return;
    }

    req.user = currentUser;
    next();
  });

  restrictTo = (...roles: string[]) => (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user?.role)) {
      next(new AppError('You do not have permission to perform this action', 403));
    }
    next();
  };

  forgotPassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      next(new AppError('There is no user with email address', 403));
      return;
    }

    const resetToken = user?.createPasswordResetToken();
    await user?.save({ validateBeforeSave: false });
    const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`;
    const message = process.env.EMAIL_MSG?.replace('RESET_URL', resetURL);

    try {
      await sendEmail({
        email: user.email,
        subject: `Your password reset token (valid for ${process.env.RESET_TOKEN_EXPIRES} min)`,
        message
      });

      res.status(200).json({
        status: 'success',
        message: 'Token sent to email!'
      });
    } catch (err) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });
      next(new AppError('There was an error sending the email. Try again later!', 500));
    }
  });

  resetPassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const hashedToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

    const user = await UserModel.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: new Date() }
    });

    if (!user) {
      next(new AppError('Token is invalid or has expired', 400));
      return;
    }
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    sendFreshToken(user, 201, res);
  });

  updatePassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserModel.findById(req.user?.id).select('+password');
    if (!user) {
      next(new AppError('The user logged in is undefined.', 500));
      return;
    }

    // check current password
    if (!(await user.passwordMatch(req.body.passwordCurrent, user.password))) {
      next(new AppError('Your current password is wrong.', 401));
      return;
    }

    // update the user's password
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    await user?.save();

    sendFreshToken(user, 200, res);
  });
}

export default AuthController;
