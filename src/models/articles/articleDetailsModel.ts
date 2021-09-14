import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
import { ONE_SEC_IN_MS } from '../../utils/time';
import { ArticleDetails } from './article';

interface ArticleDetailsDoc extends Document, ArticleDetails {}

const articleDetailsSchema = new mongoose.Schema({
  articleId: {
    type: mongoose.Types.ObjectId,
    ref: 'Article',
    required: [true, 'Please, provide the article\'s id of the reatil article']
  },
  color: {
    type: String,
    required: [true, 'Please, provide the color of the retail article']
  },
  image: {
    type: String
  },
  price: {
    type: Number,
    required: [true, 'Please, provide the price of the retail article']
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

export { ArticleDetailsDoc };

export default mongoose.model<ArticleDetailsDoc>('ArticleDetails', articleDetailsSchema);
