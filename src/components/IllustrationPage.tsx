import React from 'react';
import Image from 'material-ui-image';
import { Grid, Typography, Box, Container } from '@material-ui/core';
import baseStyles, { illustrationStyle } from '../style/styles';
import clsx from 'clsx';

enum Position {
  TOP = 'top',
  BOTTOM = 'bottom',
  CENTER = 'center',
}

export { Position };

interface Props {
  imagePath: string;
  imageAlt: string;
  title: string;
  imagePosition?: Position;
  subtitle?: string;
}

const IllustrationPage: React.FC<Props & React.ReactNode> = ({
  imagePath,
  imageAlt,
  title,
  imagePosition = Position.BOTTOM,
  subtitle,
  children,
}) => {
  const baseClasses = baseStyles();
  const homeClasses = illustrationStyle();
  const ImageItem = (
    <Grid item xs={12}>
      <Box width="80vw" maxWidth="400px">
        <Image src={process.env.PUBLIC_URL + imagePath} alt={imageAlt} cover={true} />
      </Box>
    </Grid>
  );

  return (
    <Grid container className={clsx(baseClasses.container, homeClasses.container)}>
      {imagePosition === Position.TOP && ImageItem}
      <Grid item>
        <Container>
          {title && (
            <Typography variant="h4" component="h1" className={baseClasses.title} gutterBottom>
              {title}
            </Typography>
          )}
          {subtitle && <Typography variant="subtitle1">{subtitle}</Typography>}
        </Container>
      </Grid>
      {imagePosition === Position.CENTER && ImageItem}

      {children && (
        <Grid item xs={12} sm={6}>
          {children}
        </Grid>
      )}
      {imagePosition === Position.BOTTOM && ImageItem}
    </Grid>
  );
};

export default IllustrationPage;
