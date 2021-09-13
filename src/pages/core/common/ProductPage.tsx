import React, { useState } from 'react';
import { Grid, makeStyles, IconButton } from '@material-ui/core';
import ArrowBackIosOutlined from '@material-ui/icons/ArrowBackIosOutlined';
import { useHistory, useParams } from 'react-router-dom';
import TopSection from '../../../components/TopSection';
import Image from 'material-ui-image';
import DetailsSection from './product/DetailSection';
import QuantitySection from './product/QuantitySection';
import clsx from 'clsx';

interface Props {
  article: {
    name: string;
    brand: string;
    sizes: string[];
    colors: string[];
    price: number;
    description: string;
    image?: string;
  };

  store: {
    name: string;
    logo?: string;
  };
}

const useStyles = makeStyles((theme) => ({
  container: {
    padding: `${theme.spacing(3)}px ${theme.spacing(3)}px`,
    backgroundColor: '#f9f9f9',
  },
  detailSection: {
    marginTop: `calc(32vh - ${theme.spacing(3)}px)`,
    height: `calc(68vh - (130px + ${theme.spacing(3)}px))`,
    overflowY: 'auto',
  },
  imageCover: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
  },
}));

const ProductPage: React.FC<Props> = ({ article, store }): React.ReactElement => {
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams<{ id: string }>();
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(article.price);

  console.log(`must fetch article with id ${id}`);

  const DetailsNode = (
    <DetailsSection
      {...article}
      storeName={store.name}
      storeLogo={store.logo}
      handleColorChange={setColor}
      handleSizeChange={setSize}
      selectedSize={size}
      selectedColor={color}
    />
  );

  const QuantityNode = (
    <QuantitySection
      quantity={quantity}
      handleQuantityChange={setQuantity}
      price={price}
      handlePriceChange={setPrice}
    />
  );

  return (
    <React.Fragment>
      <div className={classes.imageCover}>
        <Image
          src={article.image ?? 'not found'}
          alt={`product image of ${article.name}`}
          cover
          style={{ paddingTop: '32vh' }}
        />
      </div>
      <Grid container>
        <Grid item className={classes.container} xs={12}>
          <TopSection
            variant="simple"
            position="fixed"
            leftChild={
              <IconButton onClick={history.goBack}>
                <ArrowBackIosOutlined titleAccess="go back" fontSize="small" />
              </IconButton>
            }
          />
        </Grid>
        <Grid item xs={12} className={clsx(classes.container, classes.detailSection)}>
          {DetailsNode}
        </Grid>
      </Grid>
      {QuantityNode}
    </React.Fragment>
  );
};

export default ProductPage;
