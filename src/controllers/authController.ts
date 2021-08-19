import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import Promisify from '../utils/promisify';
import catchAsync from '../utils/catchAsync';
import User from '../models/userModel';
import IUser from '../models/user';
import AppError from '../utils/appError';
import sendEmail from '../utils/email';
import { ONE_DAY_IN_MS } from '../utils/time';

const getJwtSecret = () => (process.env.JWT_SECRET || 'invalid-token');

const generateToken = (id: string): string => jwt.sign(
  { id },
  getJwtSecret(),
  { expiresIn: process.env.JWT_EXPIRES_IN }
);

const sendFreshToken = (user: IUser, statusCode: number, res: Response) => {
  const token = generateToken(user.id);
  const cookieOptions = {
    expires: new Date(Date.now() + Number(process.env.JWT_COOKIE_EXPIRES_IN) * ONE_DAY_IN_MS),
    httpOnly: true, // prevent cross-site scripting attack
    secure: process.env.NODE_ENV === 'production'
  };

  res.cookie('jwt', token, cookieOptions);
  const { password, ...outputUser } = user.toObject(); // exclude password

  res.status(statusCode).json({
    status: 'success',
    token,
    data: { user: outputUser }
  });
};

const promisify = new Promisify<jwt.JwtPayload | string>();
const verifyToken = (token: string) => jwt.verify(token, getJwtSecret());

class AuthController {
  signup = catchAsync(async (req: Request, res: Response) => {
    const { role, ...user } = req.body;
    const newUser = await User.create(user); // client can't set the admin role;
    sendFreshToken(newUser, 201, res);
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

    sendFreshToken(user, 200, res);
  });

  checkUserToken = catchAsync(async (req: any, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    const token = authorization?.startsWith('Bearer') ? authorization.split(' ')[1] : 'invalid-token';

    if (!token) {
      next(new AppError('You are not logged in! Please log in to get access.', 401));
      return;
    }

    const decoded = await promisify.create(() => verifyToken(token));
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
      return;
    }

    req.user = currentUser;
    next();
  });

  restrictTo = (...roles: string[]) => (req: any, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      next(new AppError('You do not have permission to perform this action', 403));
    }
    next();
  };

  forgotPassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findOne({ email: req.body.email });
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

    const user = await User.findOne({
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
    const user = await User.findById((req as any).user.id).select('+password');
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
