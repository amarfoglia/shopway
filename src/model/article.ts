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
  image?: string | File;
  discount?: number;
  stockArticles: ArticleStock[];
  dateArticleAdded?: Date;
  storeId: string;
}

interface Article {
  _id?: string;
  store: Store | string;
  name: string;
  brand: string;
  description: string;
  articleDetails?: ArticleDetails[];
  category: Category;
}
export type { ArticleStock, ArticleDetails };

export default Article;
