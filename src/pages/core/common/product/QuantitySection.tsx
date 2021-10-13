import React, { useState } from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import LoadButton from '../../../../components/formFields/LoadButton';
import MyPaper from '../../../../components/MyPaper';
import { WarningDisplay } from '../../../../components/ErrorDisplay';
import NumericField from '../../../../components/formFields/NumericField';
import { PriceDisplay } from '../../../../components/ArticlePaper';

const quantityStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.default,
    [theme.breakpoints.down('xs')]: {
      position: 'fixed',
      bottom: 0,
      padding: 0,
    },
    [theme.breakpoints.up('sm')]: {
      position: 'relative',
      maxWidth: 400,
      margin: '0 auto',
    },

    width: '100%',
  },
  box: {
    borderRadius: theme.spacing(1.5),
    [theme.breakpoints.down('xs')]: {
      borderBottomRightRadius: 0,
      borderBottomLeftRadius: 0,
    },
  },
  container: {
    padding: `${theme.spacing(3)}px ${theme.spacing(3)}px`,
  },
  preOrderButton: {
    padding: `${theme.spacing(2)}px ${theme.spacing(1)}px`,
    paddingBottom: 0,
  },
}));

interface Props {
  quantity?: number;
  handleQuantityChange: (quantity: number) => void;
  price?: number;
  discountPrice?: number;
  handlePriceChange: (price: number) => void;
  isLoading: boolean;
  handleClick: () => void;
}

const QuantitySection: React.FC<Props> = ({
  quantity,
  handleQuantityChange,
  price,
  discountPrice,
  handlePriceChange,
  isLoading,
  handleClick,
}) => {
  const classes = quantityStyles();
  const [basePrice] = useState(price ?? 0);

  const decQuantity = () => {
    if (quantity && quantity > 1 && price) {
      handleQuantityChange(quantity - 1);
      handlePriceChange((discountPrice ?? price) - basePrice);
    }
  };

  const incQuantity = () => {
    if (quantity && quantity < 5 && price) {
      handleQuantityChange(quantity + 1);
      handlePriceChange((discountPrice ?? price) + basePrice);
    }
  };

  const renderContent = () => (
    <React.Fragment>
      <Grid item xs={12}>
        <Grid container justifyContent="space-between">
          <Grid item xs={7}>
            <NumericField
              handleDec={decQuantity}
              handleInc={incQuantity}
              value={quantity ?? 0}
              disabled
            />
          </Grid>
          <Grid item xs={5}>
            <Grid container justifyContent="flex-end" spacing={2}>
              <Grid item>
                <Typography variant="body1" align="right">
                  Total
                </Typography>
              </Grid>
              <Grid item>
                <PriceDisplay price={price} variant="body1" discountPrice={discountPrice} />
              </Grid>
            </Grid>
            {/* {price} */}
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} className={classes.preOrderButton}>
        <LoadButton
          isSubmitting={isLoading}
          onClick={handleClick}
          fullWidth
          variant="contained"
          color="primary"
          text="Pre-order"
        />
      </Grid>
    </React.Fragment>
  );

  return (
    <div className={classes.root}>
      <MyPaper p={0} className={classes.box}>
        <Grid container justifyContent="space-around" className={classes.container}>
          {quantity ? renderContent() : <WarningDisplay text="Not available" />}
        </Grid>
      </MyPaper>
    </div>
  );
};

export default QuantitySection;
