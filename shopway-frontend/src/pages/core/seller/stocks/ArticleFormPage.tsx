import React, { useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import { FormikHelpers, Field, useFormikContext } from 'formik';
import { useMutation } from 'react-query';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosOutlined from '@material-ui/icons/ArrowBackIosOutlined';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import AuthContext from '../../../../hooks/useAuth';
import MyForm from '../../../../components/MyForm';
import TopBar from '../../../../components/MobileTopBar';
import CorePage from '../../../../components/CorePage';
import DebouncedInput from '../../../../components/formFields/DebouncedInput';
import Typography from '@material-ui/core/Typography';
import { Container, makeStyles } from '@material-ui/core';
import Article from '../../../../model/article';
import SelectField from '../../../../components/formFields/SelectField';
import Category, { categories, subCategories } from '../../../../model/category';
import { jsonClient, Payload } from '../../../../utils/axiosClient';
import { articleValidation } from '../../../../model/validation/validationSchema';
import { getStoreId } from '../../../../model/users/user';
import { AppError } from '../../../../model/http';
import Routes from '../../../../utils/routes';

interface FieldsProps {
  onChange: (e: React.ChangeEvent<string>) => void;
}

type Values = Partial<Article>;

const Fields: React.FC<FieldsProps> = ({ onChange }) => {
  const { values } = useFormikContext<Values>();
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Product information</Typography>
      </Grid>
      <Grid item xs={12}>
        <Field
          name="name"
          placeholder="Name"
          aria-label="Name"
          variant="outlined"
          onChange={onChange}
          component={DebouncedInput}
          value={values.name}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <Field
          name="brand"
          placeholder="Brand"
          aria-label="Brand"
          variant="outlined"
          onChange={onChange}
          component={DebouncedInput}
          value={values.brand}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <Field
          name="category.categoryArticle"
          aria-label="Category"
          label="Category"
          variant="outlined"
          data={categories}
          component={SelectField}
          value={values.category?.categoryArticle}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <Field
          name="category.categoryType"
          aria-label="Subcategory"
          label="Subcategory"
          variant="outlined"
          data={subCategories}
          component={SelectField}
          value={values.category?.categoryType}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">Description</Typography>
      </Grid>
      <Grid item xs={12}>
        <Field
          name="description"
          placeholder="Description"
          aria-label="Description"
          variant="outlined"
          onChange={onChange}
          component={DebouncedInput}
          value={values.description}
          multiline
          fullWidth
        />
      </Grid>
    </Grid>
  );
};

const createArticle = (article: Partial<Article>) =>
  jsonClient.post<Article, Payload<Article>>('/articles', article).then((res) => res);

const updateArticle = (article: Partial<Article>) =>
  jsonClient
    .patch<Article, Payload<Article>>(`/articles/${article._id}`, article)
    .then((res) => res);

interface FormProps {
  initValues: {
    name: string;
    brand: string;
    description: string;
    category: Category;
  };
  articleId?: string;
}

const FormSection: React.FC<FormProps> = ({ initValues, articleId }) => {
  const { user } = useContext(AuthContext);
  const storeId = getStoreId(user);
  const history = useHistory();

  const _redirectToArticlePage = (data: Payload<Article>) => {
    const article = data?.data?.article;
    article?._id &&
      history.replace(Routes.ARTICLE_DETAILS_PAGE.replace(':id', article._id), {
        article,
      });
  };

  const {
    error,
    isLoading,
    mutate: _createArticle,
  } = useMutation<Payload<Article>, AppError, Partial<Article>>(createArticle, {
    onSuccess: _redirectToArticlePage,
  });

  const { mutate: _updateArticle } = useMutation<Payload<Article>, AppError, Partial<Article>>(
    updateArticle,
    {
      onSuccess: _redirectToArticlePage,
    },
  );

  const handleSubmit = (values: Values, helpers: FormikHelpers<Values>) => {
    const article = { ...values, store: storeId };
    articleId ? _updateArticle({ ...article, _id: articleId }) : _createArticle(article);
    helpers.setSubmitting(false);
  };

  return (
    <MyForm
      errors={error?.message}
      initialValues={initValues}
      handleSubmit={handleSubmit}
      validationSchema={articleValidation}
      formId={'article-form'}
      isSubmitting={isLoading}
      form={(h) => <Fields onChange={h} />}
      submitText={articleId ? 'Update' : 'Add'}
    />
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
    backgroundColor: theme.palette.background.default,
    height: '100%',
  },
}));

type State = {
  article?: Article;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Props = RouteComponentProps<any, any, State | any>;

const initValues = {
  brand: '',
  name: '',
  description: '',
  category: { categoryArticle: '', categoryType: '' },
};

const ArticleFormPage: React.FC<Props> = ({ location: { state } }): React.ReactElement => {
  const history = useHistory();
  const classes = useStyles();
  const article = state && (state as State).article;

  const sections = [
    { node: <FormSection initValues={article ?? initValues} articleId={article?._id} /> },
  ];

  return (
    <Container maxWidth="md" className={classes.container}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TopBar
            variant="simple"
            position="relative"
            p={0}
            centerTitle={'Add article'}
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

export default ArticleFormPage;
