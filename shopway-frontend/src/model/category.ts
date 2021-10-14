import { kidShoesSize, shirtSize, shoesSize, trouserSize } from './size';

interface Category {
  categoryArticle: string;
  categoryType: string;
}

const category1 = ['Jacket', 'T-Shirt', 'Shirt', 'Swimsuit'];
const category2 = ['Pants', 'Shorts'];
const category3 = ['Shoes', 'Boots', 'Slippers'];

const categories = [...category1, ...category2, ...category3];

const subCategories = ['Man', 'Woman', 'Child'];

const getSizes: (c: Category) => string[] = ({ categoryArticle: ca, categoryType: ct }) =>
  category3.includes(ca)
    ? ct === 'Kid'
      ? kidShoesSize
      : shoesSize
    : category2.includes(ca)
    ? trouserSize
    : shirtSize;

export { categories, subCategories, getSizes };

export default Category;
