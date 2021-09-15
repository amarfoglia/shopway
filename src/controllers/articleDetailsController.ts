import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import HandlerFactory from './helpers/handlerFactory';
import ArticleDetailsModel, { ArticleDetailsDoc } from '../models/articles/articleDetailsModel';
import { ArticleDetails, ArticleStock } from '../models/articles/article';
import AppError from '../utils/appError';
import ArticleModel from '../models/articles/articleModel';
import SellerModel from '../models/users/sellerModel';

const factory = new HandlerFactory<ArticleDetailsDoc>();

class ArticleDetailsController {
  addArticleDetails = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
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
    articleDetails.image = `photo-${articleDetails.articleId}-${articleDetails.id}.jpeg`;
    await req.file?.toFile(`public/img/articledetails/${articleDetails.image}`);
    const newArticleDetails = await ArticleDetailsModel.create(articleDetails);
    if (!newArticleDetails) {
      next(new AppError('Cannot create article', 500));
      return;
    }
    res.status(201).json({
      status: 'success',
      data: { articleDetails: newArticleDetails }
    });
  });

  checkArticleSize = (stockArticles: ArticleStock[]): boolean => {
    /* inserisce in un set tutti i size degli articleStock, se la lunghezza dell'array unique
       è diversa dalla lunghezza dello stock article allora
       c'è una ripetizione di size es: [{size: M, qnt: 10}, {size: M, qnt: 2}, {size: S, qnt:3}]
       unique.lenght = 2 (cioè size M e S).
    */
    const unique = [...new Set(stockArticles.map((elem) => elem.size))];
    return unique.length === stockArticles.length;
  }

  updateMe = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id: articleDetailsId } = req.params;

    const seller:any = await SellerModel.findById(req.user?.id);
    const articleDetails = await ArticleDetailsModel.findById(articleDetailsId);
    const article = await ArticleModel.findById(articleDetails?.articleId);
    const storeId = article?.storeId;

    if (!seller?.stores.includes(storeId)) {
      next(new AppError('You do not have the permission.', 400));
      return;
    }

    const newArticleDetails: ArticleDetails = req.body;
    newArticleDetails.image = `photo-${storeId}-${articleDetailsId}.jpeg`;
    await req.file?.toFile(`public/img/articledetails/${newArticleDetails.image}`);
    // effettua controllo che lo store sia effettivamente del seller loggato.
    const updatedArticleDetails = await ArticleDetailsModel.findByIdAndUpdate(articleDetailsId, {
      ...newArticleDetails
    }, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      status: 'success',
      data: { updatedArticleDetails }
    });
  });

  getArticleDetails = factory.getOne(ArticleDetailsModel);

  getAllArticlesDetails = factory.getAll(ArticleDetailsModel, {});

  updateArticleDetails = factory.updateOne(ArticleDetailsModel);

  deleteArticleDetails = factory.deleteOne(ArticleDetailsModel);
}

export default ArticleDetailsController;
