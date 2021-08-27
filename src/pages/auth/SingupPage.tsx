import React, { useState } from 'react';
import { Button, Typography, CircularProgress } from '@material-ui/core';
import { Formik, Form, FormikHelpers } from 'formik';

import { SellerForm, UserForm } from './forms';
import { SellerFormModel, SignupFormModel } from '../../model/auth';
import { signupValidation } from '../../model/auth/validationSchema';

const steps = ['User details', 'Seller details'];
const { formId: userFormId, formField: userFormField } = SignupFormModel;
const { formField: sellerFormField } = SellerFormModel;

const { email, password, confirmPassword } = userFormField;
const { store, address, city } = sellerFormField;

const initialValues = {
  [email.name]: '',
  [password.name]: '',
  [confirmPassword.name]: '',
  [store.name]: '',
  [address.name]: '',
  [city.name]: '',
};

function _renderStepContent(step: number) {
  switch (step) {
    case 0:
      return <UserForm formField={userFormField} />;
    case 1:
      return <SellerForm formField={sellerFormField} />;
    default:
      return <div>Not Found</div>;
  }
}

type Values = typeof initialValues;

const SignupPage: React.FC<void> = () => {
  const [activeStep, setActiveStep] = useState(0);
  const currentValidationSchema = signupValidation[activeStep];
  const isLastStep = activeStep === steps.length - 1;

  async function _submitForm(values: Values, helpers: FormikHelpers<Values>) {
    // alert(JSON.stringify(values, null, 2));
    helpers.setSubmitting(false);
    setActiveStep(activeStep + 1);
  }

  function _handleSubmit(values: Values, helpers: FormikHelpers<Values>) {
    if (isLastStep) {
      _submitForm(values, helpers);
    } else {
      setActiveStep(activeStep + 1);
      helpers.setTouched({});
      helpers.setSubmitting(false);
    }
  }

  const _handleBack = () => setActiveStep(activeStep - 1);

  return (
    <React.Fragment>
      <Typography component="h1" variant="h4" align="center">
        Signup
      </Typography>
      <React.Fragment>
        {activeStep === steps.length ? (
          <p>Registration success!</p>
        ) : (
          <Formik
            initialValues={initialValues}
            validationSchema={currentValidationSchema}
            onSubmit={_handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form id={userFormId}>
                {_renderStepContent(activeStep)}
                {activeStep !== 0 && <Button onClick={_handleBack}>Back</Button>}
                {isSubmitting ? (
                  <CircularProgress size={24} />
                ) : (
                  <Button disabled={isSubmitting} type="submit" variant="contained" color="primary">
                    {isLastStep ? 'Confirm' : 'Next'}
                  </Button>
                )}
              </Form>
            )}
          </Formik>
        )}
      </React.Fragment>
    </React.Fragment>
  );
};

export default SignupPage;
