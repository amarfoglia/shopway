import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import { Form, Formik, FormikHelpers, FormikValues } from 'formik';
import { ReactNode } from 'react';
import LoadButton from './formFields/LoadButton';
import ErrorDisplay from './ErrorDisplay';

type ChangeHandler = (e: React.ChangeEvent<string>) => void;

interface Props {
  errors?: string;
  handleSubmit: (values: FormikValues, helpers: FormikHelpers<FormikValues>) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validationSchema?: any;
  initialValues: FormikValues;
  submitText?: string;
  isSubmitting: boolean;
  formId: string;
  footer?: ReactNode;
  validateOnBlur?: boolean;
  form: (handleChange: ChangeHandler) => ReactNode;
}

const renderForm = (
  formId: string,
  FormFields: React.ReactNode,
  buttonText: string,
  isLoading: boolean,
  footer?: React.ReactNode,
  errors?: string,
) => (
  <Form id={formId}>
    <Grid container spacing={3}>
      {errors && (
        <Grid item xs={12}>
          <ErrorDisplay text={errors} />
        </Grid>
      )}
      <Grid item xs={12}>
        {FormFields}
      </Grid>
      <Grid item xs={12}>
        <LoadButton
          isSubmitting={isLoading}
          text={buttonText}
          variant="contained"
          color="primary"
          fullWidth
        />
      </Grid>
      {footer && (
        <Grid item xs={12}>
          {footer}
        </Grid>
      )}
    </Grid>
  </Form>
);

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('sm')]: {
      maxWidth: 400,
      margin: '0 auto',
    },
  },
}));

const MyForm: React.FC<Props & ReactNode> = ({
  errors,
  footer,
  submitText = 'Confirm',
  formId,
  isSubmitting,
  form,
  initialValues,
  validationSchema,
  validateOnBlur = true,
  handleSubmit,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnChange={false}
        validateOnBlur={validateOnBlur}
        onSubmit={handleSubmit}
      >
        {({ handleChange }) => {
          return renderForm(formId, form(handleChange), submitText, isSubmitting, footer, errors);
        }}
      </Formik>
    </div>
  );
};

export default MyForm;
