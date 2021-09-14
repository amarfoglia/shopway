import React, { Dispatch, SetStateAction, useState } from 'react';
import { Grid, makeStyles, Typography, IconButton } from '@material-ui/core';
import RemoveOutlined from '@material-ui/icons/RemoveOutlined';
import AddOutlined from '@material-ui/icons/AddOutlined';
import LoadButton from '../../../../components/formFields/LoadButton';
import MyPaper from '../../../../components/MyPaper';

const quantityStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.default,
    position: 'sticky',
    bottom: 0,
    left: 0,
    padding: 0,
    width: '100%',
  },
  container: {
    padding: `${theme.spacing(3)}px ${theme.spacing(3)}px`,
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
  const classes = quantityStyles();

  const [basePrice] = useState(price);

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
    <div className={classes.root}>
      <MyPaper p={0}>
        <Grid container justifyContent="space-around" className={classes.container}>
          <Grid item xs={12}>
            <Grid container justifyContent="space-between">
              <Grid container xs={7} spacing={2} alignItems="center">
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
              <Grid item xs={5}>
                <Typography variant="body1" align="right">
                  Total ${price}
                </Typography>
              </Grid>
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
      </MyPaper>
    </div>
  );
};

export default QuantitySection;
