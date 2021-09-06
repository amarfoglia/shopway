interface Category {
  categoryArticle: String;
  categoryType: String;
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
  BACKPACK: 'Zaino'
};

const categoryType = {
  TYPE: {
    MAN: 'Uomo',
    WOMAN: 'Donna',
    CHILD: 'Bambino'
  }
};

export { categoryArticle, categoryType };
export default Category;
