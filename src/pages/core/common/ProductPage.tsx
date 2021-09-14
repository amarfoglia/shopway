import React, { useState } from 'react';
import { Grid, makeStyles, IconButton } from '@material-ui/core';
import ArrowBackIosOutlined from '@material-ui/icons/ArrowBackIosOutlined';
import { useHistory, useParams } from 'react-router-dom';
import TopBar from '../../../components/TopBar';
import Image from 'material-ui-image';
import DetailsSection from './product/DetailSection';
import QuantitySection from './product/QuantitySection';

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
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
    backgroundColor: theme.palette.background.default,
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
      <TopBar
        variant="simple"
        leftChild={
          <IconButton onClick={history.goBack}>
            <ArrowBackIosOutlined titleAccess="go back" fontSize="small" />
          </IconButton>
        }
      />
      <Grid container>
        <Grid item xs={12}>
          <div>
            <Image
              src={article.image ?? 'not found'}
              alt={`product image of ${article.name}`}
              cover
              aspectRatio={4 / 3}
            />
          </div>
        </Grid>
        <Grid item xs={12} className={classes.container}>
          {DetailsNode}
        </Grid>
      </Grid>
      {QuantityNode}
    </React.Fragment>
  );
};

export default ProductPage;
