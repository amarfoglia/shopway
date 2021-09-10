import React, { useState } from 'react';
import { Grid, makeStyles, IconButton } from '@material-ui/core';
import ArrowBackIosOutlined from '@material-ui/icons/ArrowBackIosOutlined';
import { useHistory, useParams } from 'react-router-dom';
import CorePage from '../../../components/CorePage';
import TopSection from '../../../components/TopSection';
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
    padding: `${theme.spacing(4)}px ${theme.spacing(3)}px`,
    backgroundColor: '#f9f9f9',
    height: '100%',
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
  const imageHeight = '35vh';
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(article.price);

  console.log(`must fetch resource with id ${id}`);

  return (
    <React.Fragment>
      <div className={classes.imageCover}>
        <Image
          src={article.image ?? 'not found'}
          alt={`product image of ${article.name}`}
          cover
          style={{ paddingTop: imageHeight }}
        />
      </div>
      <Grid container direction="column">
        <Grid item xs={12}>
          <TopSection
            variant="simple"
            position="fixed"
            leftChild={
              <IconButton onClick={history.goBack}>
                <ArrowBackIosOutlined titleAccess="go back" />
              </IconButton>
            }
          />
        </Grid>
        <Grid item xs={12} style={{ marginTop: imageHeight }}>
          <CorePage
            sections={[
              {
                node: (
                  <DetailsSection
                    {...article}
                    storeName={store.name}
                    storeLogo={store.logo}
                    handleColorChange={setColor}
                    handleSizeChange={setSize}
                    selectedSize={size}
                    selectedColor={color}
                  />
                ),
              },
              {
                node: (
                  <QuantitySection
                    quantity={quantity}
                    handleQuantityChange={setQuantity}
                    price={price}
                    handlePriceChange={setPrice}
                  />
                ),
              },
            ]}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default ProductPage;
