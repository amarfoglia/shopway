import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import catchAsync from '../utils/catchAsync';
import HandlerFactory from './helpers/handlerFactory';
import ArticleDetailsModel, { ArticleDetailsDoc } from '../models/articles/articleDetailsModel';
import { ArticleDetails, ArticleStock } from '../models/articles/article';
import AppError from '../utils/appError';
import SellerModel from '../models/users/sellerModel';
import { setPhoto } from './helpers/imageController';

const factory = new HandlerFactory<ArticleDetailsDoc>('articleDetails');
class ArticleDetailsController {
  addArticleDetails = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const articleDetails : ArticleDetails = req.body;
    articleDetails.articleId = req.params.id;
    const userId = req.user?.id;

    if (!userId || !articleDetails.articleId || !articleDetails.storeId) {
      next(new AppError('the id of article or store or user is not defined', 400));
      return;
    }

    const seller = await SellerModel.findById(userId);

    if (!seller) {
      next(new AppError('Seller not found', 404));
      return;
    }

    if (!seller?.stores.includes(articleDetails.storeId)) {
      next(new AppError('The seller does not own the store', 400));
      return;
    }

    if (!this.checkArticleSize(articleDetails.stockArticles)) {
      next(new AppError('Size must be unique, found duplicates in stockArticles', 400));
      return;
    }

    if (req.file) { articleDetails.image = await setPhoto('photo', [uuidv4(), new Date().getTime().toString()], 'public/img/articledetails', req, next); }

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

  updateArticleDetails = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id: articleDetailsId } = req.params;

    const seller = await SellerModel.findById(req.user?.id);
    const oldArticleDetails = await ArticleDetailsModel.findById(articleDetailsId);

    const newArticleDetails: ArticleDetails = req.body;

    // se c'è la photo la setta nuova, sennò non c'è non esegue il setPhoto.
    if (req.file) { newArticleDetails.image = await setPhoto('photo', [oldArticleDetails?.storeId, articleDetailsId], 'public/img/articledetails', req, next); }
    // effettua l'update solo se l'articleDetails è nello store del seller che vuole fare l'update.
    const updatedArticleDetails: any = await ArticleDetailsModel.updateOne(
      { $and: [{ _id: articleDetailsId }, { storeId: { $in: seller?.stores } }] },
      { ...newArticleDetails },
      { new: true, runValidators: true }
    );

    if (updatedArticleDetails.nModified === 0) {
      next(new AppError('You are not authorised to update the article', 400));
      return;
    }

    res.status(200).json({
      status: 'success',
      data: { articleDetails: newArticleDetails }
    });
  });

  getArticleDetails = factory.getOne(ArticleDetailsModel);

  getAllArticlesDetails = factory.getAll(ArticleDetailsModel, {});

  deleteArticleDetails = factory.deleteOne(ArticleDetailsModel);
}

export default ArticleDetailsController;
