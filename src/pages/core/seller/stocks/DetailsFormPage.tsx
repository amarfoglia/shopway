import React from 'react';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosOutlined from '@material-ui/icons/ArrowBackIosOutlined';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import TopBar from '../../../../components/TopBar';
import CorePage from '../../../../components/CorePage';
import { Container, makeStyles } from '@material-ui/core';
import { ArticleDetails } from '../../../../model/article';
import MainFormSection from './details/forms/MainFormSection';
import Category, { getSizes } from '../../../../model/category';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
    backgroundColor: theme.palette.background.default,
    height: '100%',
  },
}));

type State = {
  details?: ArticleDetails;
  category: Category;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Props = RouteComponentProps<any, any, State | any>;

const DetailsFormPage: React.FC<Props> = ({ location: { state } }): React.ReactElement => {
  const history = useHistory();
  const classes = useStyles();
  const _state: State = state && (state as State);

  !_state.category && history.goBack();

  const Content = (
    <MainFormSection
      details={_state.details}
      sizes={getSizes(_state.category)}
      onSubmit={(v) => console.log(v)}
    />
  );

  const sections = [{ node: Content }];

  return (
    <Container maxWidth="md" className={classes.container}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TopBar
            variant="simple"
            position="relative"
            p={0}
            centerTitle={'Variations'}
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

export default DetailsFormPage;
