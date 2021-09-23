import React, { useState } from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import LoadButton from '../../../../components/formFields/LoadButton';
import MyPaper from '../../../../components/MyPaper';
import { WarningDisplay } from '../../../../components/ErrorDisplay';
import NumericField from '../../../../components/formFields/NumericField';

const quantityStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.default,
    position: 'fixed',
    bottom: 0,
    padding: 0,
    width: '100%',
  },
  noBorderBottom: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: theme.spacing(1.5),
    borderTopRightRadius: theme.spacing(1.5),
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
  handlePriceChange: (price: number) => void;
  isLoading: boolean;
  handleClick: () => void;
}

const QuantitySection: React.FC<Props> = ({
  quantity,
  handleQuantityChange,
  price,
  handlePriceChange,
  isLoading,
  handleClick,
}) => {
  const classes = quantityStyles();
  const [basePrice] = useState(price ?? 0);

  const decQuantity = () => {
    if (quantity && quantity > 1 && price) {
      handleQuantityChange(quantity - 1);
      handlePriceChange(price - basePrice);
    }
  };

  const incQuantity = () => {
    if (quantity && quantity < 5 && price) {
      handleQuantityChange(quantity + 1);
      handlePriceChange(price + basePrice);
    }
  };

  const renderContent = () => (
    <React.Fragment>
      <Grid item xs={12}>
        <Grid container justifyContent="space-between">
          <Grid item xs={7}>
            <NumericField handleDec={decQuantity} handleInc={incQuantity} value={quantity ?? 0} />
          </Grid>
          <Grid item xs={5}>
            <Typography variant="body1" align="right">
              Total ${price}
            </Typography>
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
      <MyPaper p={0} className={classes.noBorderBottom}>
        <Grid container justifyContent="space-around" className={classes.container}>
          {quantity ? renderContent() : <WarningDisplay text="Not available" />}
        </Grid>
      </MyPaper>
    </div>
  );
};

export default QuantitySection;
