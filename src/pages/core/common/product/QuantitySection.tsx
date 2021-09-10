import React, { Dispatch, SetStateAction } from 'react';
import { Grid, makeStyles, Paper, Typography, IconButton } from '@material-ui/core';
import RemoveOutlined from '@material-ui/icons/RemoveOutlined';
import AddOutlined from '@material-ui/icons/AddOutlined';
import clsx from 'clsx';
import baseStyles from '../../../../style/styles';
import LoadButton from '../../../../components/formFields/LoadButton';

const quantityStyles = makeStyles((theme) => ({
  container: {
    padding: `${theme.spacing(3)}px ${theme.spacing(3)}px`,
  },
  quantityPopup: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    padding: 0,
    width: '100%',
  },
  preOrderButton: {
    padding: `${theme.spacing(2)}px ${theme.spacing(1)}px`,
    paddingBottom: 0,
  },
  quantityButton: {
    color: 'black',
    padding: 0,
    backgroundColor: '#e9e9e9',
  },
}));

interface Props {
  quantity: number;
  handleQuantityChange: Dispatch<SetStateAction<number>>;
  price: number;
  handlePriceChange: Dispatch<SetStateAction<number>>;
}

const QuantitySection: React.FC<Props> = ({
  quantity,
  handleQuantityChange,
  price,
  handlePriceChange,
}) => {
  const baseClasses = baseStyles();
  const classes = quantityStyles();
  const basePrice = Object.assign({}, price);

  const decQuantity = () => {
    if (quantity > 1) {
      handleQuantityChange(quantity - 1);
      handlePriceChange(price - basePrice);
    }
  };

  const incQuantity = () => {
    handleQuantityChange(quantity + 1);
    handlePriceChange(price + basePrice);
  };

  return (
    <Paper elevation={3} className={clsx(baseClasses.paperPopup, classes.quantityPopup)}>
      {
        <Grid
          container
          direction="column"
          justifyContent="space-around"
          className={classes.container}
        >
          <Grid item container xs={12} direction="row" justifyContent="space-between">
            <Grid item container xs={6} spacing={2} direction="row" alignItems="center">
              <Grid item>
                <Typography variant="body1">Qty</Typography>
              </Grid>
              <Grid item>
                <IconButton className={classes.quantityButton} onClick={decQuantity}>
                  <RemoveOutlined />
                </IconButton>
              </Grid>
              <Grid item>
                <Typography variant="body1">{quantity}</Typography>
              </Grid>
              <Grid item>
                <IconButton className={classes.quantityButton} onClick={incQuantity}>
                  <AddOutlined />
                </IconButton>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="body1">Total ${price}</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.preOrderButton}>
            <LoadButton
              isSubmitting={false}
              fullWidth
              variant="contained"
              color="primary"
              text="Pre-order"
            />
          </Grid>
        </Grid>
      }
    </Paper>
  );
};

export default QuantitySection;
