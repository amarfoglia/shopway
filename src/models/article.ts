interface StockArticle {
  quantity: number;
  size: string;
}

interface RetailArticle{
  id?: any;
  articleId: any;
  color: string;
  price: string;
  image: string;
  discount?: string;
  stockArticles: StockArticle[];
}

interface Article {
  id?: any;
  storeId: any;
  name: string;
  brand: string;
  description: string;
  retailArticles: RetailArticle[];
}
export { StockArticle, RetailArticle };
export default Article;
