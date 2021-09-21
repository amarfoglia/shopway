import mongoose from 'mongoose';
import AppError from '../../utils/appError';
import { ONE_SEC_IN_MS } from '../../utils/time';
import { ArticleDetails } from './article';
import ArticleModel from './articleModel';

interface ArticleDetailsDoc extends Document, ArticleDetails {}

const articleDetailsSchema = new mongoose.Schema({
  articleId: {
    type: mongoose.Types.ObjectId,
    ref: 'Article',
    required: [true, 'Please, provide the articleId of the article details']
  },
  storeId: {
    type: mongoose.Types.ObjectId,
    ref: 'Store',
    required: [true, 'Please, provide the store Id of the article detail']
  },
  color: {
    type: String,
    required: [true, 'Please, provide the color of the article details']
  },
  image: {
    type: String
  },
  price: {
    type: Number,
    required: [true, 'Please, provide the price of the article details']
  },
  discount: {
    type: String
  },
  stockArticles: [{
    quantity: {
      type: Number,
      required: [true, 'Please, provide the quantity of the stock article']
    },
    size: {
      type: String,
      required: [true, 'Please, provide the size of the stock article']
    }
  }],
  dateArticleAdded: {
    type: Date,
    default: () => new Date(Date.now() - ONE_SEC_IN_MS)
  }
});

articleDetailsSchema.pre<ArticleDetailsDoc>('save', async function _(next) {
  const articleDetails = this;
  const filter = { _id: articleDetails.articleId };
  const update = { $addToSet: { articleDetails: articleDetails.id } };
  if ((this as any).isNew) {
    const articleUpdated = await ArticleModel.findByIdAndUpdate(filter, update);
    if (!articleUpdated) {
      next(new AppError('Impossible to insert articleDetailsId in article', 500));
      return;
    }
  }
  next();
});
export { ArticleDetailsDoc };

export default mongoose.model<ArticleDetailsDoc>('ArticleDetails', articleDetailsSchema);
