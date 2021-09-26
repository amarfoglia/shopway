import React, { useContext } from 'react';
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
import AuthContext from '../../../../hooks/useAuth';
import { getStoreId } from '../../../../model/users/user';
import { useMutation } from 'react-query';
import { formDataClient, Payload } from '../../../../utils/axiosClient';
import { AppError } from '../../../../model/http';
import PATHS from '../../../../utils/routes';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';

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
  articleId: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Props = RouteComponentProps<any, any, State | any>;

type UpdateParams = { details: FormData; id: string };

const createStock = (details: FormData) =>
  formDataClient.post<FormData, Payload<ArticleDetails>>('/details', details).then((res) => res);

const updateStock = (p: UpdateParams) =>
  formDataClient
    .patch<FormData, Payload<ArticleDetails>>(`/details/${p.id}`, p.details)
    .then((res) => res);

const deleteStock = (id: string) =>
  formDataClient.delete<void, Payload<void>>(`/details/${id}`).then((res) => res);

const DetailsFormPage: React.FC<Props> = ({ location: { state } }): React.ReactElement => {
  const history = useHistory();
  const classes = useStyles();
  const { user } = useContext(AuthContext);
  const { category, details, articleId }: State = state && (state as State);
  const storeId = getStoreId(user);

  !category && history.goBack();

  const _redirectToStocksPage = () =>
    history.push({ pathname: PATHS.SELLER_MAIN, search: 'tab=1' });

  const {
    error: deleteError,
    isLoading: isLoadingOnDelete,
    mutate: _deleteStock,
  } = useMutation<Payload<void>, AppError, string>(deleteStock, {
    onSuccess: _redirectToStocksPage,
  });

  const {
    error: createError,
    isLoading: isLoadingOnCreate,
    mutate: _createStock,
  } = useMutation<Payload<ArticleDetails>, AppError, FormData>(createStock, {
    onSuccess: _redirectToStocksPage,
  });

  const {
    error: updateError,
    isLoading: isLoadingOnUpdate,
    mutate: _updateStock,
  } = useMutation<Payload<ArticleDetails>, AppError, UpdateParams>((p) => updateStock(p), {
    onSuccess: _redirectToStocksPage,
  });

  const errorMessage = ''.concat(
    createError?.message ?? '',
    updateError?.message ?? '',
    deleteError?.message ?? '',
  );

  const isLoading = isLoadingOnCreate || isLoadingOnUpdate || isLoadingOnDelete;

  const handleSubmit = (formData: FormData) =>
    details && details._id
      ? _updateStock({ details: formData, id: details._id })
      : _createStock(formData);

  const renderContent = (storeId: string) => (
    <MainFormSection
      details={details}
      sizes={getSizes(category)}
      onSubmit={handleSubmit}
      articleId={articleId}
      storeId={storeId}
      errorMessage={errorMessage}
      isLoading={isLoading}
    />
  );

  const sections = [{ node: storeId ? renderContent(storeId) : <span></span> }];

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
            rightChild={
              details &&
              details._id && (
                <IconButton
                  onClick={() => details._id && _deleteStock(details._id)}
                  style={{ padding: 0 }}
                >
                  <DeleteOutlined titleAccess="delete stock" fontSize="medium" color="error" />
                </IconButton>
              )
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
