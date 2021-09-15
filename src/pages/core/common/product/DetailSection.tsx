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
  //style={{ overflow: 'auto', height: 'calc(100% - 104px)' }}
  <Grid container spacing={3} style={{ overflow: 'auto', height: 'calc(100% - 100px)' }}>
    <Grid item xs={12}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item xs={8}>
              <Typography variant="h5">{name}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1" align="right">
                {brand}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" align="justify">
            {description}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={1} alignItems="center">
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
    </Grid>
    <Grid item xs={12}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <RadioSizes
            selectedSize={selectedSize}
            handleSizeChange={handleSizeChange}
            sizes={sizes}
          />
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
  </Grid>
);

export default DetailsSection;
