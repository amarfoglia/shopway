import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import HandlerFactory from './helpers/handlerFactory';
import ArticleDetailsModel, { ArticleDetailsDoc } from '../models/articles/articleDetailsModel';
import { ArticleDetails } from '../models/articles/article';
import AppError from '../utils/appError';

const factory = new HandlerFactory<ArticleDetailsDoc>();

class ArticleDetailsController {
  addRetailArticle = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const articleDetails : ArticleDetails = req.body;
    articleDetails.articleId = req.params.id;
    if (!articleDetails.articleId) {
      next(new AppError('the id of article is not defined', 400));
    }
    const newArticleDetails = await ArticleDetailsModel.create(articleDetails);
    if (!newArticleDetails) {
      next(new AppError('Cannot create article', 500));
    }
    res.status(201).json({
      status: 'success',
      data: { newArticleDetails }
    });
  });

  getRetailArticle = factory.getOne(ArticleDetailsModel);

  getAllRetailArticles = factory.getAll(ArticleDetailsModel, {});

  updateRetailArticle = factory.updateOne(ArticleDetailsModel);

  deleteRetailArticle = factory.deleteOne(ArticleDetailsModel);
}

export default ArticleDetailsController;
