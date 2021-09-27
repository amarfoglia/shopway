import React from 'react';
import {
  Box,
  Divider,
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
import Article, { ArticleDetails, ArticleStock } from '../../../../../model/article';
import MyPaper from '../../../../../components/MyPaper';
import MyAvatar from '../../../../../components/MyAvatar';
import { useHistory } from 'react-router-dom';
import PATHS from '../../../../../utils/routes';
import { SkeletonLoader } from '../../../../../components/Loader';
import BottomFab from '../../../../../components/BottomFab';

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
  stocks?.length > 0 && stocks.flatMap((s) => s.quantity).reduce((s1, s2) => s1 + s2, 0);

interface ItemProps {
  details: ArticleDetails;
  handleClick: () => void;
}

const DetailsItem: React.FC<ItemProps> = ({ handleClick, details }) => {
  const { image, stockArticles, color } = details;
  const quantity = computeQuantity(stockArticles);
  const classes = datailsStyles({ color });
  return (
    <ListItem onClick={handleClick}>
      <ListItemAvatar>
        <MyAvatar
          shape="square"
          subject="articledetail"
          size="large"
          alt="article image"
          imagePath={image as string}
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
      <ListItemSecondaryAction onClick={handleClick}>
        <ArrowForwardIosOutlined fontSize="small" className={classes.greyColor} />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

const useStyles = makeStyles({
  moveRight: {
    textAlign: 'right',
  },
  detailsPaper: {
    overflowY: 'auto',
    maxHeight: 'calc(64px * 6 + 12px)',
  },
});

interface Props {
  article: Article;
}

const VariantsSection: React.FC<Props> = ({ article }) => {
  const history = useHistory();
  const classes = useStyles();
  !article && history.goBack();
  const { articleDetails: details, category } = article;

  const _goTodetailsForm = (detailsItem?: ArticleDetails) =>
    article._id &&
    history.push(PATHS.ARTICLE_DETAILS_FORM.replace(':id', article._id), {
      details: detailsItem,
      category,
      articleId: article._id,
    });

  const _renderItems = (items: ArticleDetails[]) => (
    <List dense>
      {items.map((d, i) => (
        <React.Fragment key={d._id}>
          <DetailsItem details={d} handleClick={() => _goTodetailsForm(d)} />
          {i === items.length - 1 ? '' : <Divider variant="inset" component="li" />}
        </React.Fragment>
      ))}
    </List>
  );
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {!details ? (
          <MyPaper>
            <SkeletonLoader />
          </MyPaper>
        ) : (
          <MyPaper customStyle={classes.detailsPaper}>
            {details.length > 0 && _renderItems(details)}
          </MyPaper>
        )}
      </Grid>
      <Grid item xs={12} className={classes.moveRight}>
        <BottomFab handleClick={() => _goTodetailsForm()} />
      </Grid>
    </Grid>
  );
};

export default VariantsSection;
