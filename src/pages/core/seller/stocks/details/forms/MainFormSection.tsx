import React, { useMemo } from 'react';
import Grid from '@material-ui/core/Grid';
import { FormikHelpers, Field, useFormikContext, FormikValues } from 'formik';
import DebouncedInput from '../../../../../../components/formFields/DebouncedInput';
import Typography from '@material-ui/core/Typography';
import { ArticleDetails, ArticleStock } from '../../../../../../model/article';
import SelectField from '../../../../../../components/formFields/SelectField';
import MyForm from '../../../../../../components/MyForm';
import NumericField from '../../../../../../components/formFields/NumericField';
import MyPaper from '../../../../../../components/MyPaper';
import { SizeIcon } from '../../../../../../components/RadioSizes';
import ImageUploader from '../../../../../../components/ImageUploader';
import { detailsValidation } from '../../../../../../model/validation/validationSchema';
import objectToFormData from '../../../../../../utils/formdata';

const colors = [
  'red',
  'blue',
  'green',
  'yellow',
  'white',
  'grey',
  'black',
  'brown',
  'pink',
  'violet',
  'orange',
];

interface FieldsProps {
  onChange: (e: React.ChangeEvent<string>) => void;
}

interface FormProps {
  color: string;
  price: number;
  image?: string | File;
  discount?: string;
  stockArticles: ArticleStock[];
}

interface StockFieldProps {
  value: number;
  handleChange: (field: string, value: number) => void;
  name: string;
}

const StockField: React.FC<StockFieldProps> = ({ value, handleChange, name }) => (
  <NumericField
    value={value}
    handleInc={() => handleChange(name, value + 1)}
    handleDec={() => handleChange(name, value - 1)}
    hideLabel
  />
);

interface StockProps {
  value: ArticleStock;
  handleChange: (field: string, value: number) => void;
  index: number;
}

const StockItem: React.FC<StockProps> = ({ value, index, handleChange }) => (
  <Grid item xs={12}>
    <Grid container justifyContent="space-between">
      <Grid item>
        <SizeIcon value={value.size} />
      </Grid>
      <Grid item>
        <StockField
          name={`stockArticles.${index}.quantity`}
          value={value.quantity ?? 0}
          handleChange={handleChange}
        />
      </Grid>
    </Grid>
  </Grid>
);

const Fields: React.FC<FieldsProps> = ({ onChange }) => {
  const { values, setFieldValue } = useFormikContext<FormProps>();
  const inputParams = {
    id: 'articledetails-image-input',
    inputName: 'articledetails-image',
    onImageUpload: (f: File) => setFieldValue('image', f),
  };
  const Uploader = useMemo(
    () => (
      <ImageUploader input={inputParams} image={values.image as File} subject="articledetail" />
    ),
    [values.image],
  );
  return (
    <Grid container spacing={2} justifyContent="space-between">
      <Grid item xs={12}>
        <Typography variant="h6">Product information</Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            {Uploader}
          </Grid>

          <Grid item xs={8}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Field
                  name="color"
                  aria-label="Color"
                  label="Color"
                  variant="outlined"
                  data={colors}
                  component={SelectField}
                  value={values.color}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <Field
                  name="price"
                  placeholder="Price"
                  aria-label="Price"
                  variant="outlined"
                  onChange={onChange}
                  component={DebouncedInput}
                  value={values.price}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <Field
                  name="discount"
                  placeholder="Discount"
                  aria-label="Discount"
                  variant="outlined"
                  onChange={onChange}
                  component={DebouncedInput}
                  value={values.discount}
                  fullWidth
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h6">Quantities</Typography>
      </Grid>

      <Grid item xs={12}>
        <MyPaper style={{ overflowY: 'auto', maxHeight: '34vh' }}>
          <Grid container spacing={2} alignItems="center">
            {values.stockArticles?.map((v, i) => (
              <StockItem key={`stock-${i}`} value={v} index={i} handleChange={setFieldValue} />
            ))}
          </Grid>
        </MyPaper>
      </Grid>
    </Grid>
  );
};

interface Props {
  sizes: string[];
  details?: ArticleDetails;
  articleId: string;
  storeId: string;
  onSubmit: (formData: FormData) => void;
  errorMessage?: string;
  isLoading: boolean;
}
const MainFormSection: React.FC<Props> = ({
  details,
  sizes,
  articleId,
  storeId,
  onSubmit,
  errorMessage,
  isLoading,
}) => {
  const handleSubmit = (values: FormikValues, helpers: FormikHelpers<FormikValues>) => {
    const { image, stockArticles, ...detailsItem } = values as FormProps;
    const formData: FormData = objectToFormData({
      articleId,
      storeId,
      photo: image,
      stockArticles: stockArticles.filter((s) => s.quantity > 0),
      ...detailsItem,
    });
    onSubmit(formData);
    helpers.setSubmitting(false);
  };

  const initValues: FormProps = {
    color: '',
    price: 0,
    stockArticles: sizes.flatMap((s) => ({ quantity: 0, size: s })),
  };

  return (
    <MyForm
      errors={errorMessage}
      initialValues={details ?? initValues}
      handleSubmit={handleSubmit}
      validationSchema={detailsValidation}
      formId={'article-details-form'}
      isSubmitting={isLoading}
      form={(h) => <Fields onChange={h} />}
      submitText={details?.articleId ? 'Update' : 'Add'}
    />
  );
};

export default MainFormSection;
