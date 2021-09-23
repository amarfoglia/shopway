import { makeStyles, Typography, IconButton } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import AddOutlined from '@material-ui/icons/AddOutlined';
import RemoveOutlined from '@material-ui/icons/RemoveOutlined';
import React from 'react';

const useStyles = makeStyles({
  numericInput: {
    color: 'black',
    padding: 0,
    backgroundColor: '#e9e9e9',
  },
  numberDisplay: {
    width: 30,
    textAlign: 'center',
  },
});

interface Props {
  handleDec: () => void;
  handleInc: () => void;
  value: number;
  hideLabel?: boolean;
}

const NumericField: React.FC<Props> = ({ handleInc, handleDec, value, hideLabel = false }) => {
  const classes = useStyles();
  return (
    <Grid container spacing={1} alignItems="center">
      {!hideLabel && (
        <Grid item>
          <Typography variant="body1">Qty</Typography>
        </Grid>
      )}
      <Grid item>
        <IconButton className={classes.numericInput} onClick={handleDec}>
          <RemoveOutlined />
        </IconButton>
      </Grid>
      <Grid item className={classes.numberDisplay}>
        <Typography variant="body1" component="span">
          {value}
        </Typography>
      </Grid>
      <Grid item>
        <IconButton className={classes.numericInput} onClick={handleInc}>
          <AddOutlined />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default NumericField;
