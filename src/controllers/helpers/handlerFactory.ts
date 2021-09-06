import { Model, FilterQuery } from 'mongoose';
import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import AppError from '../../utils/appError';
import APIFeatures from '../../utils/apiFeatures';

class HandlerFactory<T> {
  deleteOne = (model: Model<T>) => catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const doc = await model.findByIdAndDelete(req.params.id);

      if (!doc) {
        next(new AppError('No document found with that ID', 404));
        return;
      }

      res.status(204).json({
        status: 'success',
        data: null
      });
    }
  );

  updateOne = (model: Model<T>) => catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const doc = await model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });
      if (!doc) {
        next(new AppError('No document found with that ID', 404));
        return;
      }

      res.status(200).json({
        status: 'success',
        data: { doc }
      });
    }
  );

  createOne = (model: Model<T>) => catchAsync(
    async (req: Request, res: Response) => {
      const doc = await model.create(req.body);

      res.status(201).json({
        status: 'success',
        data: { doc }
      });
    }
  );

  getOne = (model: Model<T>, popOptions?: string[]) => catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const query = model.findById(req.params.id);
      const doc = await query.populate(popOptions);
      console.log(doc);
      if (!doc) {
        next(new AppError('No document found with that ID', 404));
        return;
      }

      res.status(200).json({
        status: 'success',
        data: { doc }
      });
    }
  );

  getAll = (model: Model<T>, filter: FilterQuery<T>) => catchAsync(
    async (req: Request, res: Response) => {
      const features = new APIFeatures(model.find(filter), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();

      const doc = await features.query;

      res.status(200).json({
        status: 'success',
        results: doc.length,
        data: { doc }
      });
    }
  );
}

export default HandlerFactory;
