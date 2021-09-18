import Category from '../category';

interface ArticleStock {
  quantity: number;
  size: string;
}

interface ArticleDetails{
  id?: any;
  storeId: any;
  articleId: string;
  color: string;
  price: string;
  image: string;
  discount?: string;
  stockArticles: ArticleStock[];
  dateArticleAdded: Date;
}

interface Article {
  id?: string;
  storeId: string;
  name: string;
  brand: string;
  description: string;
  retailArticles: ArticleDetails[];
  previewPhoto: string;
  category: Category;
}
export { ArticleStock, ArticleDetails };
export default Article;
