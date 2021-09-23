import React from 'react';
import Grid from '@material-ui/core/Grid';
import { FormikHelpers, Field, useFormikContext } from 'formik';
import DebouncedInput from '../../../../../../components/formFields/DebouncedInput';
import Typography from '@material-ui/core/Typography';
import { ArticleDetails } from '../../../../../../model/article';
import SelectField from '../../../../../../components/formFields/SelectField';
import MyForm from '../../../../../../components/MyForm';
import NumericField from '../../../../../../components/formFields/NumericField';
import MyPaper from '../../../../../../components/MyPaper';
import { SizeIcon } from '../../../../../../components/RadioSizes';
import ImageUploader from '../../../../../../components/ImageUploader';

const colors = ['red', 'blue', 'green', 'yellow'];

interface FieldsProps {
  onChange: (e: React.ChangeEvent<string>) => void;
}

type Values = Partial<ArticleDetails>;

interface StockProps {
  value: number;
  handleChange: (field: string, value: number) => void;
  name: string;
}

const StockField: React.FC<StockProps> = ({ value, handleChange, name }) => (
  <NumericField
    value={value}
    handleInc={() => handleChange(name, value + 1)}
    handleDec={() => handleChange(name, value - 1)}
    hideLabel
  />
);

const Fields: React.FC<FieldsProps> = ({ onChange }) => {
  const { values, setFieldValue } = useFormikContext<Values>();
  return (
    <Grid container spacing={2} justifyContent="space-between">
      <Grid item xs={12}>
        <Typography variant="h6">Product information</Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <ImageUploader
              input={{
                id: 'articledetails-image-input',
                inputName: 'articledetails-image',
                onImageUpload: (f) => setFieldValue('image', f),
              }}
              image={values.image as File}
              subject="article"
            />
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
              <Grid item key={`stock-${i}`} xs={12}>
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <SizeIcon value={v.size} />
                  </Grid>
                  <Grid item>
                    <StockField
                      name={`stockArticles.${i}.quantity`}
                      value={v.quantity ?? 0}
                      handleChange={setFieldValue}
                    />
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </MyPaper>
      </Grid>
    </Grid>
  );
};

interface FormProps {
  sizes: string[];
  details?: ArticleDetails;
  onSubmit: (article: ArticleDetails) => void;
}

const MainFormSection: React.FC<FormProps> = ({ details, sizes }) => {
  const handleSubmit = (values: Values, helpers: FormikHelpers<Values>) => {
    console.log(values);
    helpers.setSubmitting(false);
  };

  const initValues = {
    color: '',
    price: 0,
    stockArticles: sizes.flatMap((s) => ({ quantity: 0, size: s })),
  };

  return (
    <MyForm
      // errors={error?.message}
      initialValues={initValues}
      handleSubmit={handleSubmit}
      // validationSchema={articleValidation}
      formId={'article-details-form'}
      isSubmitting={false}
      form={(h) => <Fields onChange={h} />}
      submitText={details?.articleId ? 'Update' : 'Add'}
    />
  );
};

export default MainFormSection;
