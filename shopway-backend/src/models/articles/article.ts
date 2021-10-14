import Category from '../category';

interface ArticleStock {
  quantity: number;
  size: string;
}

interface ArticleDetails{
  id?: any;
  articleId: any;
  storeId: any;
  color: string;
  price: string;
  image: string;
  discount?: string;
  stockArticles: ArticleStock[];
  dateArticleAdded: Date;
}

interface Article {
  id?: string;
  store: string;
  articleDetails: ArticleDetails[];
  name: string;
  brand: string;
  description: string;
  category: Category;
}
export { ArticleStock, ArticleDetails };
export default Article;
