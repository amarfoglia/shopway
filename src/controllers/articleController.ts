import { NextFunction, Request, Response } from 'express';
import APIFeatures from '../utils/apiFeatures';
import catchAsync from '../utils/catchAsync';
import HandlerFactory from './helpers/handlerFactory';
import ArticleModel, { ArticleDoc } from '../models/articles/articleModel';
import AppError from '../utils/appError';
import Article from '../models/articles/article';
import { isCategoryArticle, isCategoryType } from '../models/category';
import Seller from '../models/users/seller';

const factory = new HandlerFactory<ArticleDoc>('article');

// @ts-ignore
class ArticleController {
  addArticle = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const article = req.body as Article;
    const seller = req.user as Seller;
    const userId = req.user?.id;

    if (!userId) {
      next(new AppError('user id is not defined.', 400));
      return;
    }

    if (!seller?.stores.includes(article.store)) {
      next(new AppError('You cannot create an article that is not in your store.', 400));
      return;
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
    const seller = req.user as Seller;
    const newArticle = req.body as Article;
    const articleId = req.params.id;
    if (!seller?.stores.includes(newArticle?.store ?? 'invalid-id')) {
      next(new AppError('the seller does not own the article, cannot update', 400));
      return;
    }

    if (newArticle.category) {
      if (!isCategoryArticle(newArticle.category.categoryArticle)
      || !isCategoryType(newArticle.category.categoryType)) {
        next(new AppError('Category or CategoryType is not valid', 400));
        return;
      }
    }

    const updatedArticle = await ArticleModel.findByIdAndUpdate(
      articleId,
      newArticle,
      { new: true }
    );
    res.status(201).json({
      status: 'success',
      data: { article: updatedArticle }
    });
  });

  getArticlesFromStore = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const storeId = req.params.id;
    if (!storeId) {
      next(new AppError('invalid store-id', 404));
      return;
    }
    const features = new APIFeatures(ArticleModel.find({ store: storeId }), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const articles = await features.query;
    res.status(200).json({
      status: 'success',
      data: { articles }
    });
  });

  getArticle = factory.getOne(ArticleModel);

  getAllArticles = catchAsync(async (req: Request, res: Response) => {
    const { name, categoryType, categoryArticle } = req.query;
    const nameFilter = name ? { name: new RegExp(name as string, 'i') } : {};
    const categoryFilter = categoryArticle ? { 'category.categoryArticle': categoryArticle as string } : {};
    const subCategoryFilter = categoryType ? { 'category.categoryType': categoryType as string } : {};
    const features = new APIFeatures(
      ArticleModel.find({
        ...categoryFilter,
        ...subCategoryFilter,
        ...nameFilter,
      }), req.query
    )
      .sort()
      .limitFields()
      .paginate();

    const doc = await features.query;

    res.status(200)
      .json({
        status: 'success',
        results: doc.length,
        data: { article: doc }
      });
  });

  deleteArticle = factory.deleteOne(ArticleModel);
}

export default ArticleController;
