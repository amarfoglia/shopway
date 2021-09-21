interface Category {
  categoryArticle: string;
  categoryType: string;
}

const categories = [
  'Jacket',
  'Shorts',
  'Shirt',
  'T-Shirt',
  'Pants',
  'Trunk',
  'Shoes',
  'Slippers',
  'Boots',
  'Bag',
  'Backpack',
];

const subCategories = ['Man', 'Woman', 'Child'];

export { categories, subCategories };

export default Category;
