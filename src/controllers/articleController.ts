import { NextFunction, Request, Response } from 'express';
import { FilterQuery } from 'mongoose';
import catchAsync from '../utils/catchAsync';
import HandlerFactory from './helpers/handlerFactory';
import ArticleModel, { ArticleDoc } from '../models/articles/articleModel';
import AppError from '../utils/appError';
import Article, { ArticleDetails } from '../models/articles/article';
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

    // check if the seller is authorised to create an article in the store.
    if (!seller?.stores.includes(article.storeId)) {
      next(new AppError('You cannot create an article that is not in your store.', 400));
    }

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

  /*
  getArticleDisplay = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const articlesDisplay = await ArticleModel.aggregate([
      {
        $lookup: {
          from: 'articledetails',
          localField: '_id',
          foreignField: 'articleId',
          as: 'ad'
        }
      },
      { $unwind: '$ad' },
      {
        $group: {
          _id: '$_id',
          name: { $first: '$name' },
          brand: { $first: '$brand' },
          description: { $first: '$description' },
          categoryArticle: { $first: '$category.categoryArticle' },
          categorySex: { $first: '$category.categoryType' },
          details: {
            $push: {
              image: '$ad.image',
              price: '$ad.price',
              color: '$ad.color',
              discount: '$ad.discount'
            }
          }
        }
      }
    ]);
    res.status(200).json({
      status: 'success',
      data: { article: articlesDisplay }
    });
  });
*/
  getArticle = factory.getOne(ArticleModel);

  getAllArticles = factory.getAll(ArticleModel, {});

  deleteArticle = factory.deleteOne(ArticleModel);
}

export default ArticleController;
