import express, {
  Application, NextFunction, Request, Response
} from 'express';

import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import hpp from 'hpp';
import cors from 'cors';
import dotenv from 'dotenv';

import AppError from './utils/appError';
import userRouter from './routes/userRoutes';
import storeRouter from './routes/storeRoutes';
import articleRouter from './routes/articleRoutes';
import retailArticleRouter from './routes/retailArticleRoutes';
import globalErrorHandler from './controllers/helpers/errorController';
import { ONE_HOUR_IN_MS } from './utils/time';

const app: Application = express();
dotenv.config({ path: `${__dirname}/../config.env` });

app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}));

// Set security HTTP headers
app.use(helmet());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Prevent DoS and brute-force attack.
const limiter = rateLimit({
  max: 100,
  windowMs: ONE_HOUR_IN_MS,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS (html code injection)
app.use(xss());

// Prevent parameter pollution (e.g double sort param)
app.use(hpp({ whitelist: [] }));

app.use(express.static(`${__dirname}/public`));

app.use((req: Request, res: Response, next: NextFunction) => {
  (req as any).requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/users', userRouter);
app.use('/api/v1/stores', storeRouter);
app.use('/api/v1/articles', articleRouter);
app.use('/api/v1/retails', retailArticleRouter);

app.all('*', (req, _res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;
