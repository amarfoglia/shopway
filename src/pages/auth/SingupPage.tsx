import React, { useState } from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import { Formik, Form, FormikHelpers } from 'formik';

import { SellerForm, CustomerForm, UserForm, RoleForm } from './forms';
import { CustomerFormModel, SellerFormModel, SignupFormModel } from '../../model/auth';
import { signupValidation } from '../../model/auth/validationSchema';
import LoadButton from '../../components/formFields/LoadButton';
import initialValues from '../../model/auth/initialFormValues';
import { Roles } from '../../model/User';

enum STEPS {
  STEP_1 = 0,
  STEP_2 = 1,
  STEP_3C = 2,
  STEP_3S = 3,
  STEP_4 = 4,
}

const getStepOffset = (step: number) => (step === STEPS.STEP_3S ? 2 : 1);
const getStepBasedOnRole = (role: string) =>
  role === Roles.CUSTOMER.value ? STEPS.STEP_3C : STEPS.STEP_3S;

const { formId: userFormId, formField: userFormField } = SignupFormModel;
const { formField: sellerFormField } = SellerFormModel;
const { formField: customerFormField } = CustomerFormModel;

const formComponents = new Map([
  [STEPS.STEP_1, <UserForm key={STEPS.STEP_1} formField={userFormField} />],
  [STEPS.STEP_2, <RoleForm key={STEPS.STEP_2} formField={userFormField} />],
  [STEPS.STEP_3C, <CustomerForm key={STEPS.STEP_3C} formField={customerFormField} />],
  [STEPS.STEP_3S, <SellerForm key={STEPS.STEP_3S} formField={sellerFormField} />],
]);

type Values = typeof initialValues;

const SignupPage: React.FC<void> = () => {
  const [activeStep, setActiveStep] = useState(STEPS.STEP_1);
  const currentValidationSchema = signupValidation[activeStep];
  const isLastStep = activeStep === STEPS.STEP_3C || activeStep === STEPS.STEP_3S;

  async function _submitForm(values: Values) {
    console.log(values);
  }

  const _nextStep = (helpers: FormikHelpers<Values>, step: number) => {
    setActiveStep(step);
    helpers.setTouched({});
    helpers.setSubmitting(false);
  };

  function _handleSubmit(values: Values, helpers: FormikHelpers<Values>) {
    switch (activeStep) {
      case STEPS.STEP_1:
        _nextStep(helpers, STEPS.STEP_2);
        break;
      case STEPS.STEP_2:
        _nextStep(helpers, getStepBasedOnRole(values['role']));
        break;
      case STEPS.STEP_3C | STEPS.STEP_3S:
        _nextStep(helpers, STEPS.STEP_4);
        _submitForm(values);
        break;
    }
  }

  const _handleBack = () => setActiveStep(activeStep - getStepOffset(activeStep));

  return (
    <React.Fragment>
      {activeStep === STEPS.STEP_4 ? (
        <Typography variant="h4" component="h2">
          Registration success!
        </Typography>
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={currentValidationSchema}
          onSubmit={_handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form id={userFormId}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  {formComponents.get(activeStep)}
                </Grid>
                <Grid item xs={12}>
                  {activeStep > STEPS.STEP_1 && <Button onClick={_handleBack}>Back</Button>}
                  <LoadButton isSubmitting={isSubmitting} text={isLastStep ? 'Confirm' : 'Next'} />
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      )}
    </React.Fragment>
  );
};

export default SignupPage;
