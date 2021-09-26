import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
import Article from './article';

interface ArticleDoc extends Document, Article {}

const articleSchema = new mongoose.Schema({
  store: {
    type: ObjectId,
    ref: 'Store',
    required: [true, 'Please, provide the article\'s store id']
  },
  articleDetails: {
    type: [ObjectId],
    default: [],
    ref: 'ArticleDetails'
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
  },
  createdAt: {
    type: Date,
    default: new Date(Date.now())
  }
});

articleSchema.pre(/^find/, function _(next) {
  this.populate({ path: 'articleDetails' });
  this.populate({ path: 'store' });
  next();
});

export { ArticleDoc };

export default mongoose.model<ArticleDoc>('Article', articleSchema);
