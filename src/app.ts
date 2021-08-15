import express, { Application, NextFunction, Request, Response } from "express";
import morgan from 'morgan';
import AppError from "./utils/appError";
import userRouter from "./routes/userRoutes"

const app: Application = express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

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

export default app