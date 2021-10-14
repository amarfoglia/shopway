import React, { useEffect } from 'react';
import CorePage from '../../../../components/CorePage';
import { Container, Grid, IconButton, makeStyles } from '@material-ui/core';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import ArrowBackIosOutlined from '@material-ui/icons/ArrowBackIosOutlined';
import TopBar from '../../../../components/MobileTopBar';
import Article from '../../../../model/article';
import VariantsSection from './details/VariantsSection';
import ArticleSection from './details/ArticleSection';
import Routes from '../../../../utils/routes';

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
  const history = useHistory();
  const classes = useStyles();
  const article = state && (state as State).article;

  useEffect(() => {
    !article && history.push(Routes.ERROR, { error: "Missing article's details" });
  });

  const sections = article
    ? [
        { node: <ArticleSection article={article} /> },
        { node: <VariantsSection article={article} />, title: 'Variations' },
      ]
    : [];

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
              <IconButton onClick={() => history.push(Routes.SELLER_MAIN)} style={{ padding: 0 }}>
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
