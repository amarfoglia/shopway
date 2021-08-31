import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import HandlerFactory from './helpers/handlerFactory';
import ArticleModel, { ArticleDoc } from '../models/articleModel';
import AppError from '../utils/appError';
import Article from '../models/article';

const factory = new HandlerFactory<ArticleDoc>();

class ArticleController {
  addArticle = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const article = req.body as Article;
    article.idStore = req.params.idStore;
    console.log(article);
    const newArticle = await ArticleModel.create(article);
    if (!newArticle) {
      next(new AppError('Cannot create article', 500));
    }
    res.status(201).json({
      status: 'success',
      data: { data: newArticle }
    });
  });

  getArticle = factory.getOne(ArticleModel);

  getAllArticles = factory.getAll(ArticleModel, {});

  updateArticle = factory.updateOne(ArticleModel);

  deleteArticle = factory.deleteOne(ArticleModel);
}

export default ArticleController;
