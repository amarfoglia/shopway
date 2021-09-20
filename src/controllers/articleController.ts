import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import HandlerFactory from './helpers/handlerFactory';
import ArticleModel, { ArticleDoc } from '../models/articles/articleModel';
import AppError from '../utils/appError';
import Article from '../models/articles/article';
import { isCategoryArticle, isCategoryType } from '../models/category';
import SellerModel from '../models/users/sellerModel';

const factory = new HandlerFactory<ArticleDoc>('article');

class ArticleController {
  addArticle = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const article = req.body as Article;
    const userId = req.user?.id;
    if (!userId) {
      next(new AppError('user id is not defined.', 400));
    }

    const seller = await SellerModel.findById(userId);

    article.storeId = req.params.id;

    if (!seller?.stores.includes(article.storeId)) {
      next(new AppError('You cannot create an article that is not in your store.', 400));
    }

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

  updateArticle = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id;
    if (!userId) {
      next(new AppError('user id is not defined', 400));
    }
    const user = await SellerModel.findById(userId);
    const newArticle = req.body as Article;
    const articleId = req.params.id;
    const oldArticle = await ArticleModel.findById(articleId);

    if (!user?.stores.includes(oldArticle?.storeId ?? 'invalid-id')) {
      next(new AppError('the seller does not own the article, cannot update', 400));
      return;
    }

    const updatedArticle = await ArticleModel.findByIdAndUpdate(articleId, newArticle);
    res.status(201).json({
      status: 'success',
      data: { article: updatedArticle }
    });
  });

  getArticlesFromStore = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const storeId = req.params.id;
    if (!storeId) {
      next(new AppError('invalid store-id', 404));
    }
    const articles = await ArticleModel.find({ $match: { storeId } });
    res.status(200).json({
      status: 'success',
      data: { articles }
    });
  });

  getArticle = factory.getOne(ArticleModel);

  getAllArticles = factory.getAll(ArticleModel, {});

  deleteArticle = factory.deleteOne(ArticleModel);
}

export default ArticleController;
