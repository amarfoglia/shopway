import express, {
  Application, NextFunction, Request, Response,
} from 'express';

import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import AppError from './utils/appError';
import userRouter from './routes/userRoutes';
import globalErrorHandler from './controllers/errorController';

const app: Application = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const ONE_HOUR_IN_MS = 60 * 60 * 1000;

// Prevent DoS and brute-force attack.
const limiter = rateLimit({
  max: 100,
  windowMs: ONE_HOUR_IN_MS,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req: Request, res: Response, next: NextFunction) => {
  (req as any).requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/users', userRouter);

app.all('*', (req, _res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;
