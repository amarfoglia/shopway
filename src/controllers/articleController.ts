import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import HandlerFactory from './helpers/handlerFactory';
import ArticleModel, { ArticleDoc } from '../models/articles/articleModel';
import AppError from '../utils/appError';
import Article from '../models/articles/article';
import { isCategoryArticle, isCategoryType } from '../models/category';

const factory = new HandlerFactory<ArticleDoc>();

class ArticleController {
  addArticle = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const article = req.body as Article;
    article.storeId = req.params.id;
    // check if categoryArticle is a type of ours
    if (!isCategoryArticle(article.category.categoryArticle)
      || !isCategoryType(article.category.categoryType)) {
      next(new AppError('Category or CategoryType is not valid', 400));
      return;
    }
    const newArticle = await ArticleModel.create(article);
    if (!newArticle) {
      next(new AppError('Cannot create article', 500));
      return;
    }
    res.status(201).json({
      status: 'success',
      data: { article: newArticle }
    });
  });

  getArticle = factory.getOne(ArticleModel);

  getAllArticles = factory.getAll(ArticleModel, {});

  updateArticle = factory.updateOne(ArticleModel);

  deleteArticle = factory.deleteOne(ArticleModel);
}

export default ArticleController;
