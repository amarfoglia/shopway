import React, { Dispatch, SetStateAction } from 'react';
import { Grid, Typography } from '@material-ui/core';
import RadioColors from '../../../../components/RadioColors';
import RadioSizes from '../../../../components/RadioSizes';
import StoreAvatar from '../../../../components/MyAvatar';
import Article, { ArticleStock } from '../../../../model/article';
import ErrorDisplay from '../../../../components/ErrorDisplay';

interface Props {
  storeName: string;
  storeLogo?: string;
  article: Article;
  selectedColor: string;
  selectedSize: string;
  stocks?: ArticleStock[];
  error?: string;
  handleColorChange: Dispatch<SetStateAction<string>>;
  handleSizeChange: Dispatch<SetStateAction<string>>;
}

const DetailsSection: React.FC<Props> = ({
  article,
  storeName,
  storeLogo,
  error,
  selectedColor,
  selectedSize,
  stocks = [],
  handleColorChange,
  handleSizeChange,
}) => {
  const colors: string[] = article.retailArticles?.map((r) => r.color) ?? [];
  const sizes = stocks.map((s) => s.size);
  return (
    <Grid container spacing={3} style={{ overflow: 'auto', height: 'calc(100% - 100px)' }}>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item xs={8}>
                <Typography variant="h5">{article.name}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body1" align="right">
                  {article.brand}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" align="justify">
              {article.description}
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
                  subject="store"
                />
              </Grid>
              <Grid item>
                <Typography variant="body2">{storeName}</Typography>
              </Grid>
            </Grid>
          </Grid>
          {error && (
            <Grid item xs={12}>
              <ErrorDisplay text={error} />
            </Grid>
          )}
        </Grid>
      </Grid>
      {sizes.length > 0 && colors.length > 0 && (
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
      )}
    </Grid>
  );
};

export default DetailsSection;
