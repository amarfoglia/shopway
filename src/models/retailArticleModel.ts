import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
import { RetailArticle } from './article';

interface RetailArticleDoc extends Document, RetailArticle {}

const retailArticleSchema = new mongoose.Schema({
  idArticle: {
    type: ObjectId,
    ref: 'Article',
    required: [true, 'Please, provide the article\'s id of the reatil article']
  },
  color: {
    type: String,
    required: [true, 'Please, provide the color of the retail article']
  },
  image: {
    type: String,
    default: './public/images/' // DEFAULT PATH FOR IMAGE IF MISSING
  },
  price: {
    type: String,
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
  }]
});

export { RetailArticleDoc };

export default mongoose.model<RetailArticleDoc>('RetailArticle', retailArticleSchema);
