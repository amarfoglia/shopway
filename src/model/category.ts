interface Category {
  categoryArticle: string;
  categoryType: string;
}

const categoryArticle = {
  WINDBREAKER: 'Giubotto',
  JACKET: 'Giacca',
  SHORTS: 'Bermuda',
  SHIRT: 'Camicia',
  SWEAT_SHIRT: 'Felpa',
  T_SHIRT: 'Maglia',
  PANTS: 'Pantaloni',
  TRUNK: 'Pantaloncini',
  SHOES: 'Scarpe',
  SLIPPERS: 'Ciabatte',
  BOOTS: 'Stivali',
  HIGH_HEELS: 'Scarpe con tacco',
  BAG: 'Borsa',
  BACKPACK: 'Zaino',
};

const categoryType = {
  MAN: 'Uomo',
  WOMAN: 'Donna',
  CHILD: 'Bambino',
};

function isCategoryArticle(elem: string): boolean {
  return Object.values(categoryArticle).includes(elem);
}
function isCategoryType(elem: string): boolean {
  return Object.values(categoryType).includes(elem);
}

export { categoryArticle, categoryType, isCategoryArticle, isCategoryType };
export default Category;
