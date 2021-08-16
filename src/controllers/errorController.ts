import { NextFunction, Request, Response } from 'express';
import { MongoError } from 'mongodb';
import { ValidationError } from '@tsed/common';
import AppError from '../utils/appError';

const handleCastErrorDB = (err: any): AppError => (
  new AppError(`Invalid ${err.path}: ${err.value}.`, 400)
);

const handleDuplicateFieldsDB = (err: MongoError): AppError => {
  const value = err.errmsg?.match(/(["'])(\\?.)*?\1/);
  const message = `Duplicate field value: ${value ? value[0] : ''}. Please use another value!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err: Error): AppError => {
  const error = err as ValidationError;
  const errors = Object.values(error.errors).map((el: any) => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const sendErrorDev = (err: AppError, res: Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err: AppError, res: Response) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    // Programming or other unknown error: don't leak error details
  } else {
    console.error('ERROR 💥', err);
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  }
};

const handleMongoError = (err: Error): AppError => {
  const error = err as MongoError;
  switch (error.code) {
    case 11000:
      return handleDuplicateFieldsDB(error);
    default:
      return new AppError(error.message, 500);
  }
};

// eslint-disable-next-line no-unused-vars
export default (err: Error, req: Request, res: Response, _next: NextFunction) => {
  let error = err as AppError;
  error.statusCode = error.statusCode || 500;
  error.status = error.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(error, res);
  } else if (process.env.NODE_ENV === 'production') {
    if (err.name === 'CastError') { error = handleCastErrorDB(error); }
    if (err.name === 'ValidationError') { error = handleValidationErrorDB(error); }
    if (err.name === 'MongoError') { error = handleMongoError(error); }
    sendErrorProd(error, res);
  }
};
