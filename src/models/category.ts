interface Category {
  categoryArticle: string;
  categoryType: string;
}

const categoryArticle = {
  WINDBREAKER: 'Windbreaker',
  JACKET: 'Jacket',
  SHORTS: 'Shorts',
  SHIRT: 'Shirt',
  SWEAT_SHIRT: 'Sweat Shirt',
  T_SHIRT: 'T-Shirt',
  PANTS: 'Pants',
  TRUNK: 'Trunk',
  SHOES: 'Shoes',
  SLIPPERS: 'Slippers',
  BOOTS: 'Boots',
  HIGH_HEELS: 'High Heels',
  BAG: 'Bag',
  BACKPACK: 'Backpack'
};

const categoryType = {
  MAN: 'Man',
  WOMAN: 'Woman',
  CHILD: 'Child'
};

function isCategoryArticle(elem: string): boolean {
  return Object.values(categoryArticle).includes(elem);
}
function isCategoryType(elem: string): boolean {
  return Object.values(categoryType).includes(elem);
}

export {
  categoryArticle, categoryType, isCategoryArticle, isCategoryType
};
export default Category;
