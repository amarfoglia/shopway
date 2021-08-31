import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import HandlerFactory from './helpers/handlerFactory';
import RetailArticleModel, { RetailArticleDoc } from '../models/retailArticleModel';
import { RetailArticle } from '../models/article';
import AppError from '../utils/appError';

const factory = new HandlerFactory<RetailArticleDoc>();

class RetailArticleController {
  addRetailArticle = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const retailArticle = req.body as RetailArticle;
    retailArticle.idArticle = req.params.idArticle;
    if (!retailArticle.idArticle) {
      next(new AppError('the id of article is not defined', 500));
    }
    const newRetailArticle = await RetailArticleModel.create(retailArticle);
    if (!newRetailArticle) {
      next(new AppError('Cannot create article', 500));
    }
    res.status(201).json({
      status: 'success',
      data: { data: newRetailArticle }
    });
  });

  getRetailArticle = factory.getOne(RetailArticleModel);

  getAllRetailArticles = factory.getAll(RetailArticleModel, {});

  updateRetailArticle = factory.updateOne(RetailArticleModel);

  deleteRetailArticle = factory.deleteOne(RetailArticleModel);
}

export default RetailArticleController;
