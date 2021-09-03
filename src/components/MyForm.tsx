import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { Form, Formik, FormikHelpers, FormikValues } from 'formik';
import { ReactNode } from 'react';
import LoadButton from './formFields/LoadButton';

interface Props {
  errors?: string;
  handleSubmit: (values: FormikValues, helpers: FormikHelpers<FormikValues>) => void;
  validationSchema: any;
  initialValues: FormikValues;
  submitText?: string;
  isSubmitting: boolean;
  formId: string;
  footer?: ReactNode;
}

const renderErrors = (errors: string) => (
  <Typography variant="body2" color="error">
    {errors}
  </Typography>
);

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
      <Grid item xs={12}>
        {errors && renderErrors(errors)}
      </Grid>
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

const MyForm: React.FC<Props & ReactNode> = (props) => {
  const { errors, children, footer, submitText = 'Confirm', formId, isSubmitting } = props;

  return (
    <Formik
      initialValues={props.initialValues}
      validationSchema={props.validationSchema}
      onSubmit={props.handleSubmit}
    >
      {() => renderForm(formId, children, submitText, isSubmitting, footer, errors)}
    </Formik>
  );
};

export default MyForm;
