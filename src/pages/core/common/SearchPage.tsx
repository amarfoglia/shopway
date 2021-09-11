import React from 'react';
import { Box, Container, Grid, IconButton, makeStyles } from '@material-ui/core';
import ArrowBackIosOutlined from '@material-ui/icons/ArrowBackIosOutlined';
import { useHistory } from 'react-router-dom';
import CorePage from '../../../components/CorePage';
import TopSection from '../../../components/TopSection';
import { Categories } from '../../../model/Categories';
import CategoryPaper from '../../../components/CategoryPaper';

const categoriesPath = process.env.PUBLIC_URL + '/categories';

interface Props {
  subtitle1?: string;
  subtitle2?: string;
}

const useStyles = makeStyles((theme) => ({
  container: {
    padding: `${theme.spacing(4)}px ${theme.spacing(3)}px`,
    backgroundColor: '#f9f9f9',
    height: '100%',
  },
}));

const CategoriesSection = () => (
  <Grid container spacing={2}>
    {Categories.map((c) => (
      <Grid item key={c} xs={6}>
        <CategoryPaper name={c} iconPath={`${categoriesPath}/${c}.png`} />
      </Grid>
    ))}
  </Grid>
);

const sections = [{ node: <CategoriesSection /> }];

const SearchPage: React.FC<Props> = (): React.ReactElement => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <Container maxWidth="md" className={classes.container}>
      <Grid container spacing={2} direction="column">
        <Grid item xs={12}>
          <TopSection
            variant="simple"
            centerTitle="Search"
            leftChild={
              <IconButton onClick={history.goBack}>
                <ArrowBackIosOutlined titleAccess="go back" />
              </IconButton>
            }
            rightChild={<Box />}
          />
        </Grid>
        <Grid item xs={12}>
          <CorePage sections={sections} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default SearchPage;
