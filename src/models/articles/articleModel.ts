import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
import Article from './article';

interface ArticleDoc extends Document, Article {}

const articleSchema = new mongoose.Schema({
  storeId: {
    type: ObjectId,
    ref: 'Store',
    required: [true, 'Please, provide the article\'s store id']
  },
  name: {
    type: String,
    required: [true, 'Please, provide the name of the article']
  },
  brand: {
    type: String,
    required: [true, 'Please, provide the brand of the article']
  },
  description: {
    type: String,
    required: [true, 'Please, provide the description of the article']
  },
  category: {
    categoryArticle: {
      type: String,
      required: [true, 'Please, provide the category of the article']
    },
    categoryType: {
      type: String,
      required: [true, 'Please, provide the categoryType of the article']
    }
  }
});

export { ArticleDoc };

export default mongoose.model<ArticleDoc>('Article', articleSchema);
