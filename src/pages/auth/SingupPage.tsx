import React, { useState } from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import { Formik, Form, FormikHelpers } from 'formik';

import { SellerForm, CustomerForm, UserForm, RoleForm } from './forms';
import { CustomerFormModel, SellerFormModel, SignupFormModel } from '../../model/auth';
import { signupValidation } from '../../model/auth/validationSchema';
import { Roles } from '../../model/User';
import LoadButton from '../../components/formFields/LoadButton';

const steps = ['Step-1', 'Step-2', 'Step-3C', 'Step-3S'];
const ROLE_OFFSET = new Map([
  ['customer', 1],
  ['seller', 2],
]);

const { formId: userFormId, formField: userFormField } = SignupFormModel;
const { formField: sellerFormField } = SellerFormModel;
const { formField: customerFormField } = CustomerFormModel;

const { email, password, confirmPassword, role } = userFormField;
const { firstname, lastname, phone } = customerFormField;
const { store, address, city } = sellerFormField;
const { CUSTOMER } = Roles;

const initialValues = {
  [email.name]: '',
  [password.name]: '',
  [confirmPassword.name]: '',
  [role.name]: CUSTOMER.value,
  [firstname.name]: '',
  [lastname.name]: '',
  [phone.name]: '',
  [store.name]: '',
  [address.name]: '',
  [city.name]: '',
};

function _renderStepContent(step: number) {
  switch (steps[step]) {
    case 'Step-1':
      return <UserForm formField={userFormField} />;
    case 'Step-2':
      return <RoleForm formField={userFormField} />;
    case 'Step-3C':
      return <CustomerForm formField={customerFormField} />;
    case 'Step-3S':
      return <SellerForm formField={sellerFormField} />;
  }
}

type Values = typeof initialValues;

const SignupPage: React.FC<void> = () => {
  const [activeStep, setActiveStep] = useState(0);
  const currentValidationSchema = signupValidation[activeStep];
  const isLastStep = steps[activeStep]?.startsWith('Step-3');

  async function _submitForm(values: Values, helpers: FormikHelpers<Values>) {
    // alert(JSON.stringify(values, null, 2));
    console.log(values);
    helpers.setSubmitting(false);
    setActiveStep(steps.length);
  }

  const _nextStep = (helpers: FormikHelpers<Values>, offset: number) => {
    setActiveStep(activeStep + offset);
    helpers.setTouched({});
    helpers.setSubmitting(false);
  };

  function _handleSubmit(values: Values, helpers: FormikHelpers<Values>) {
    switch (steps[activeStep]) {
      case 'Step-1':
        _nextStep(helpers, 1);
        break;
      case 'Step-2':
        _nextStep(helpers, ROLE_OFFSET.get(values[role.name]) || 0);
        break;
      case 'Step-3C' || 'Step-3S':
        _submitForm(values, helpers);
        break;
    }
  }

  const _handleBack = () => {
    const offset = steps[activeStep] === 'Step-3S' ? 2 : 1;
    setActiveStep(activeStep - offset);
  };

  return (
    <React.Fragment>
      {activeStep === steps.length ? (
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
                  {_renderStepContent(activeStep)}
                </Grid>
                <Grid item xs={12}>
                  {activeStep !== 0 && <Button onClick={_handleBack}>Back</Button>}
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
