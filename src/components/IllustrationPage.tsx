import React from 'react';
import Image from 'material-ui-image';
import { Grid, Typography, Box, Container, makeStyles, Hidden } from '@material-ui/core';
import baseStyles from '../style/styles';
import IllustrationAppBar from './TopAppBar';

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

const useStyles = makeStyles((theme) => ({
  container: {
    alignItems: 'center',
    justifyContent: 'space-around',
    textAlign: 'center',
    height: 'inherit',
    // padding: `${theme.spacing(3)}px ${theme.spacing(3)}px`,
  },
  root: {
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 72px)',
    },
    [theme.breakpoints.down('xs')]: {
      height: '100%',
    },
    background: 'white',
  },
  image: {
    margin: 'auto',
    padding: theme.spacing(2),
  },
}));

const IllustrationPage: React.FC<Props> = ({
  imagePath,
  imageAlt,
  title,
  imagePosition = Position.BOTTOM,
  subtitle,
  children,
}) => {
  const baseClasses = baseStyles();
  const classes = useStyles();
  const ImageItem = (
    <Grid item xs={12} md={4}>
      <Box className={classes.image}>
        <Image src={process.env.PUBLIC_URL + imagePath} alt={imageAlt} cover={true} />
      </Box>
    </Grid>
  );

  return (
    <React.Fragment>
      <Hidden smDown>
        <IllustrationAppBar />
      </Hidden>
      <div className={classes.root}>
        <Container maxWidth="md" style={{ height: 'inherit' }}>
          <Grid container className={classes.container}>
            {imagePosition === Position.TOP && ImageItem}
            <Grid item xs={12} md={8}>
              <Container>
                {title && (
                  <Typography
                    variant="h4"
                    component="h1"
                    className={baseClasses.title}
                    gutterBottom
                  >
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
        </Container>
      </div>
    </React.Fragment>
  );
};

export default IllustrationPage;
