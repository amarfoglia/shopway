import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import HandlerFactory from './helpers/handlerFactory';
import ArticleDetailsModel, { ArticleDetailsDoc } from '../models/articles/articleDetailsModel';
import { ArticleDetails, ArticleStock } from '../models/articles/article';
import AppError from '../utils/appError';

const factory = new HandlerFactory<ArticleDetailsDoc>();

class ArticleDetailsController {
  addRetailArticle = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const articleDetails : ArticleDetails = req.body;
    articleDetails.articleId = req.params.id;

    if (!articleDetails.articleId) {
      next(new AppError('the id of article is not defined', 400));
      return;
    }

    if (!this.checkArticleSize(articleDetails.stockArticles)) {
      next(new AppError('Size must be unique, found duplicates in stockArticles', 400));
      return;
    }

    const newArticleDetails = await ArticleDetailsModel.create(articleDetails);
    if (!newArticleDetails) {
      next(new AppError('Cannot create article', 500));
      return;
    }
    res.status(201).json({
      status: 'success',
      data: { newArticleDetails }
    });
  });

  checkArticleSize = function (stockArticles: ArticleStock[]): boolean {
    /* inserisce in un set tutti i size degli articleStock, se la lunghezza dell'array unique
       è diversa dalla lunghezza dello stock article allora
       c'è una ripetizione di size es: [{size: M, qnt: 10}, {size: M, qnt: 2}, {size: S, qnt:3}]
       unique.lenght = 2 (cioè size M e S).
    */
    const unique = [...new Set(stockArticles.map((elem) => elem.size))];
    return unique.length === stockArticles.length;
  }

  getRetailArticle = factory.getOne(ArticleDetailsModel);

  getAllRetailArticles = factory.getAll(ArticleDetailsModel, {});

  updateRetailArticle = factory.updateOne(ArticleDetailsModel);

  deleteRetailArticle = factory.deleteOne(ArticleDetailsModel);
}

export default ArticleDetailsController;
