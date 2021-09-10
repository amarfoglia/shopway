import React, { Dispatch, SetStateAction } from 'react';
import { Grid, Typography } from '@material-ui/core';
import RadioColors from '../../../../components/RadioColors';
import RadioSizes from '../../../../components/RadioSizes';
import StoreAvatar from '../../../../components/MyAvatar';

interface Props {
  name: string;
  brand: string;
  description: string;
  storeName: string;
  storeLogo?: string;
  sizes: string[];
  colors: string[];
  selectedColor: string;
  selectedSize: string;
  handleColorChange: Dispatch<SetStateAction<string>>;
  handleSizeChange: Dispatch<SetStateAction<string>>;
}

const DetailsSection: React.FC<Props> = ({
  name,
  brand,
  description,
  storeName,
  storeLogo,
  sizes,
  colors,
  selectedColor,
  selectedSize,
  handleColorChange,
  handleSizeChange,
}) => (
  <Grid container direction="column" spacing={3}>
    <Grid item container xs={12} spacing={2} direction="column">
      <Grid item container justifyContent="space-between" direction="row" alignItems="center">
        <Grid item>
          <Typography variant="h5">{name}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1" align="right">
            {brand}
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1" align="justify">
          {description}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={1} direction="row" alignItems="center">
          <Grid item>
            <StoreAvatar
              size="small"
              alt={`store logo of ${storeName}`}
              text={storeName}
              imagePath={storeLogo}
            />
          </Grid>
          <Grid item>
            <Typography variant="body2">{storeName}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    <Grid item container xs={12} spacing={1} direction="column">
      <Grid item xs={12}>
        <RadioSizes selectedSize={selectedSize} handleSizeChange={handleSizeChange} sizes={sizes} />
      </Grid>
      <Grid item xs={12}>
        <RadioColors
          selectedColor={selectedColor}
          handleColorChange={handleColorChange}
          colors={colors}
        />
      </Grid>
    </Grid>
  </Grid>
);

export default DetailsSection;
