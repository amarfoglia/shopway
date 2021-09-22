import React from 'react';
import { Button, Grid, makeStyles, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import EditOutlined from '@material-ui/icons/EditOutlined';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';
import clsx from 'clsx';
import MyPaper from '../../../../../components/MyPaper';
import PATHS from '../../../../../utils/routes';
import Article from '../../../../../model/article';
import MyAvatar from '../../../../../components/MyAvatar';
import ErrorDisplay from '../../../../../components/ErrorDisplay';
import { useMutation } from 'react-query';
import { jsonClient, Payload } from '../../../../../utils/axiosClient';
import { AppError } from '../../../../../model/http';

const useStyles = makeStyles((theme) => ({
  optionButton: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
    padding: `${theme.spacing(0.5)}px ${theme.spacing(1)}`,
    borderRadius: theme.spacing(1),
  },
  errorColor: {
    color: theme.palette.error.main,
    borderColor: theme.palette.error.main,
  },
  warningColor: {
    color: theme.palette.warning.main,
    borderColor: theme.palette.warning.main,
  },
  optionFooter: {
    textAlign: 'right',
  },
}));

interface Props {
  article: Article;
}

const deleteArticle = (id: string) =>
  jsonClient.delete<void, Payload<void>>(`/articles/${id}`).then((res) => res);

const ArticleSection: React.FC<Props> = ({ article }) => {
  const classes = useStyles();
  const history = useHistory();
  const previewPhoto = article.articleDetails?.[0]?.image;

  const _redirectToStocksPage = () => history.replace(`${PATHS.SELLER_MAIN}?tab=2`);

  const {
    error,
    isLoading,
    mutate: _deleteArticle,
  } = useMutation<Payload<void>, AppError, string>(deleteArticle, {
    onSuccess: _redirectToStocksPage,
  });

  return (
    <React.Fragment>
      {error && <ErrorDisplay text={error?.message} mb={2} />}
      <MyPaper>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <MyAvatar
              subject="articledetail"
              alt="article photo"
              size="fullWidth"
              shape="square"
              imagePath={previewPhoto}
            />
          </Grid>
          <Grid item xs={8}>
            <Grid container justifyContent="space-between">
              <Grid item xs={12}>
                <Typography variant="h6" component="h5">
                  {article.name}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                  {article.brand}
                </Typography>
              </Grid>
              <Grid item xs={12} className={classes.optionFooter}>
                <Button
                  variant="outlined"
                  size="small"
                  disabled={isLoading}
                  startIcon={<DeleteOutlined />}
                  className={clsx(classes.optionButton, classes.errorColor)}
                  onClick={() => article._id && _deleteArticle(article._id)}
                >
                  Delete
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  color="primary"
                  disabled={isLoading}
                  startIcon={<EditOutlined />}
                  className={clsx(classes.optionButton, classes.warningColor)}
                  onClick={() => history.push(PATHS.ARTICLE_FORM, { article })}
                >
                  Edit
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </MyPaper>
    </React.Fragment>
  );
};

export default ArticleSection;
