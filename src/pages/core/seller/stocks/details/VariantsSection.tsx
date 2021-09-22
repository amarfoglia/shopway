import React from 'react';
import {
  Box,
  Divider,
  Fab,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import ArrowForwardIosOutlined from '@material-ui/icons/ArrowForwardIosOutlined';
import Skeleton from '@material-ui/lab/Skeleton';
import AddOutlined from '@material-ui/icons/AddOutlined';
import { ArticleDetails, ArticleStock } from '../../../../../model/article';
import MyPaper from '../../../../../components/MyPaper';
import MyAvatar from '../../../../../components/MyAvatar';

const datailsStyles = makeStyles<Theme, { color: string }>((theme) => ({
  colorSquare: {
    borderRadius: 30,
    padding: theme.spacing(0.8),
    backgroundColor: (props) => props.color,
  },
  greyColor: {
    color: theme.palette.grey[500],
  },
}));

const computeQuantity = (stocks: ArticleStock[]) =>
  (stocks?.length > 0 && stocks?.flatMap((s) => s.quantity).reduce((s1, s2) => s1 + s2)) ?? 0;

const DetailsItem: React.FC<ArticleDetails> = ({ image, stockArticles, color }) => {
  const quantity = computeQuantity(stockArticles);
  const classes = datailsStyles({ color });
  return (
    <ListItem>
      <ListItemAvatar>
        <MyAvatar
          shape="square"
          subject="articledetail"
          size="medium"
          alt="article image"
          imagePath={image}
        />
      </ListItemAvatar>
      <ListItemText
        primary={
          <Grid container spacing={1} alignItems="center" style={{ display: 'flex' }}>
            <Grid item>
              <Typography>Color</Typography>
            </Grid>
            <Grid item>
              <Box className={classes.colorSquare} />
            </Grid>
          </Grid>
        }
        secondary={`Qty: ${quantity}`}
      />
      <ListItemSecondaryAction onClick={() => console.log('go To detail form!')}>
        <ArrowForwardIosOutlined fontSize="small" className={classes.greyColor} />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

const VariantsSection: React.FC<{ details?: ArticleDetails[] }> = ({ details }) => {
  const _renderItems = (items: ArticleDetails[]) => (
    <List dense>
      {items.map((o) => (
        <React.Fragment key={o._id}>
          <DetailsItem {...o} />
          {items.indexOf(o) === items.length - 1 ? '' : <Divider variant="inset" component="li" />}
        </React.Fragment>
      ))}
    </List>
  );
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <MyPaper>
          {!details ? (
            <Skeleton variant="rect" width={'100%'} height={118} />
          ) : details.length > 0 ? (
            _renderItems(details)
          ) : (
            <Grid container>
              <Grid item xs={12}>
                <Typography variant="subtitle2" align="center">
                  There&apos;s no variants, start to add!
                </Typography>
              </Grid>
            </Grid>
          )}
        </MyPaper>
      </Grid>
      <Grid item xs={12} style={{ textAlign: 'right' }}>
        <Fab color="primary" aria-label="add" size="medium">
          <AddOutlined />
        </Fab>
      </Grid>
    </Grid>
  );
};

export default VariantsSection;
