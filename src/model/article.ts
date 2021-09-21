import Category from './category';
import Store from './users/store';

interface ArticleStock {
  quantity: number;
  size: string;
}

interface ArticleDetails {
  _id?: string;
  articleId: string;
  color: string;
  price: number;
  image: string;
  discount?: string;
  stockArticles: ArticleStock[];
  dateArticleAdded: Date;
}

interface Article {
  _id?: string;
  store: Store | string;
  name: string;
  brand: string;
  description: string;
  articleDetails?: ArticleDetails[];
  previewPhoto: string;
  category: Category;
}
export type { ArticleStock, ArticleDetails };

export default Article;
