import React from 'react';
import CorePage from '../../../../components/CorePage';
import { Container, Grid, IconButton, makeStyles } from '@material-ui/core';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import ArrowBackIosOutlined from '@material-ui/icons/ArrowBackIosOutlined';
import TopBar from '../../../../components/TopBar';
import Article from '../../../../model/article';
import VariantsSection from './details/VariantsSection';
import ArticleSection from './details/ArticleSection';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
    backgroundColor: theme.palette.background.default,
    height: '100%',
  },
}));

type State = {
  article: Article;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Props = RouteComponentProps<any, any, State | any>;

const ArticleDetailsPage: React.FC<Props> = ({ location: { state } }): React.ReactElement => {
  const classes = useStyles();
  const history = useHistory();
  const article = (state as State).article;

  const sections = [
    { node: <ArticleSection article={article} />, title: 'Article summary' },
    { node: <VariantsSection details={article.articleDetails} />, title: 'Variations' },
  ];

  return (
    <Container maxWidth="md" className={classes.container}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TopBar
            variant="simple"
            position="relative"
            p={0}
            centerTitle={'Article details'}
            leftChild={
              <IconButton onClick={history.goBack} style={{ padding: 0 }}>
                <ArrowBackIosOutlined titleAccess="go back" fontSize="small" />
              </IconButton>
            }
          />
        </Grid>
        <Grid item xs={12}>
          <CorePage sections={sections} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ArticleDetailsPage;
