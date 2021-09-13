import React from 'react';

const clothesPath = process.env.PUBLIC_URL + '/clothes';

const product = {
  productName: 'Product name',
  price: '18.50',
  discountPrice: '15.00',
  productImage: `${clothesPath}/tshirt2.png`,
  storeName: 'Store name',
  storeLogo: `${process.env.PUBLIC_URL}/logo192.png`,
};

const articleDetails = {
  article: {
    name: 'Air 50',
    brand: 'NIKE',
    description:
      "Nike's athletic footwear products are designed primarily for specific" +
      'athletic use, although a large percentage of the products are worn for casual or leisure',
    sizes: ['38', '40', '41', '42', '43'],
    colors: ['red', 'white', 'black', 'green'],
    price: 79,
  },
  store: {
    name: 'Nike Store',
  },
};

export { product, articleDetails };
