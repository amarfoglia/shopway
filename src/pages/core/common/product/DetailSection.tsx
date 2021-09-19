import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import RadioColors from '../../../../components/RadioColors';
import RadioSizes from '../../../../components/RadioSizes';
import StoreAvatar from '../../../../components/MyAvatar';
import Article, { ArticleStock } from '../../../../model/article';
import ErrorDisplay from '../../../../components/ErrorDisplay';
import PATHS from '../../../../utils/routes';
import { useHistory } from 'react-router-dom';

interface Props {
  storeName: string;
  storeLogo?: string;
  article: Article;
  selectedColor?: string;
  selectedSize?: string;
  error?: string;
  handleColorChange: (color: string) => void;
  handleSizeChange: (size: string) => void;
}

const generateSize = (s: ArticleStock) => ({
  value: s.size,
  disabled: s.quantity === 0,
});

const DetailsSection: React.FC<Props> = ({
  article,
  storeName,
  storeLogo,
  error,
  selectedColor,
  selectedSize,
  handleColorChange,
  handleSizeChange,
}) => {
  const colors: string[] = article.articleDetails?.map((r) => r.color) ?? [];
  const sizes =
    article.articleDetails
      ?.find((d) => d.color === selectedColor)
      ?.stockArticles.flatMap(generateSize) ?? [];

  const history = useHistory();

  const goToStorePage = () => history.push(PATHS.STORE_PAGE.replace(':id', article.store?._id));

  return (
    <Grid container spacing={2} style={{ overflow: 'auto', height: 'calc(100% - 100px)' }}>
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
                  handleClick={goToStorePage}
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
              <RadioColors
                selectedColor={selectedColor ?? ''}
                handleColorChange={handleColorChange}
                colors={colors}
              />
            </Grid>
            <Grid item xs={12}>
              <RadioSizes
                selectedSize={selectedSize ?? ''}
                handleSizeChange={handleSizeChange}
                sizes={sizes}
              />
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default DetailsSection;
