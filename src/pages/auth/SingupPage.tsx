import React, { useContext, useState } from 'react';
import { Fab, Grid, Paper, Typography } from '@material-ui/core';
import { Formik, Form, FormikHelpers } from 'formik';
import { Link } from 'react-router-dom';
import ArrowBackIosOutlined from '@material-ui/icons/ArrowBackIosOutlined';
import clsx from 'clsx';

import { SellerForm, CustomerForm, UserForm, RoleForm } from './forms';
import { CustomerFormModel, SellerFormModel, SignupFormModel } from '../../model/auth';
import { signupValidation } from '../../model/auth/validationSchema';
import LoadButton from '../../components/formFields/LoadButton';
import initialValues from '../../model/auth/initialFormValues';
import { Roles } from '../../model/User';
import PATHS from '../../utils/routes';
import baseStyles, { authStyles } from '../../style/styles';
import AuthContext from '../../hooks/useAuth';

enum STEPS {
  STEP_1 = 0,
  STEP_2 = 1,
  STEP_3C = 2,
  STEP_3S = 3,
}

const getStepOffset = (step: number) => (step === STEPS.STEP_3S ? 2 : 1);
const getStepBasedOnRole = (role: string) =>
  role === Roles.CUSTOMER.value ? STEPS.STEP_3C : STEPS.STEP_3S;

const { formId: userFormId, formField: userFormField } = SignupFormModel;
const { formField: sellerFormField } = SellerFormModel;
const { formField: customerFormField } = CustomerFormModel;

const formComponents = new Map([
  [STEPS.STEP_1, <UserForm key={`FormStep-${STEPS.STEP_1}`} formField={userFormField} />],
  [STEPS.STEP_2, <RoleForm key={`FormStep-${STEPS.STEP_2}`} formField={userFormField} />],
  [STEPS.STEP_3C, <CustomerForm key={`FormStep-${STEPS.STEP_3C}`} formField={customerFormField} />],
  [STEPS.STEP_3S, <SellerForm key={`FormStep-${STEPS.STEP_3S}`} formField={sellerFormField} />],
]);

type Values = typeof initialValues;

const SignupPage: React.FC<void> = () => {
  const { register, error: signupError, isLoading } = useContext(AuthContext);
  const [activeStep, setActiveStep] = useState(STEPS.STEP_1);
  const currentValidationSchema = signupValidation[activeStep];
  const isLastStep = activeStep === STEPS.STEP_3C || activeStep === STEPS.STEP_3S;
  const baseClasses = baseStyles();
  const classes = authStyles();

  const _submitForm = (values: Values) => {
    console.log(values);
    const { fullName, password, passwordConfirm, email, role, ...store } = values;
    const user = {
      fullName,
      password,
      passwordConfirm,
      email,
      role,
      store,
    };
    register(user);
  };

  const renderErrors = () =>
    signupError && (
      <Grid item xs={12}>
        <Typography color="error" variant="body2" gutterBottom>
          {signupError}
        </Typography>
      </Grid>
    );

  const _handleBack = () => setActiveStep(activeStep - getStepOffset(activeStep));

  const renderBackButton = () =>
    activeStep > STEPS.STEP_1 && (
      <Grid item className={baseClasses.backFabGrid}>
        <Fab color="primary" aria-label="back">
          <ArrowBackIosOutlined onClick={_handleBack} />
        </Fab>
      </Grid>
    );

  const renderForm = () => (
    <Form id={userFormId}>
      <Grid container spacing={3}>
        {renderErrors()}
        <Grid item xs={12}>
          {formComponents.get(activeStep)}
        </Grid>
        <Grid item xs={12}>
          <LoadButton
            isSubmitting={isLoading}
            variant="contained"
            color="primary"
            fullWidth
            type={'submit'}
            text={isLastStep ? 'Confirm' : 'Next'}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2">
            Already have an account?&nbsp;
            <Link to={PATHS.SIGN_IN} className={baseClasses.link}>
              Sign in
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </Form>
  );

  const _nextStep = (helpers: FormikHelpers<Values>, step: number) => {
    setActiveStep(step);
    helpers.setTouched({});
    helpers.setSubmitting(false);
  };

  const _handleSubmit = (values: Values, helpers: FormikHelpers<Values>) => {
    switch (activeStep) {
      case STEPS.STEP_1:
        _nextStep(helpers, STEPS.STEP_2);
        break;
      case STEPS.STEP_2:
        _nextStep(helpers, getStepBasedOnRole(values['role']));
        break;
      case STEPS.STEP_3C:
      case STEPS.STEP_3S:
        _submitForm(values);
        break;
    }
  };

  return (
    <Grid container className={clsx(baseClasses.container, classes.container)}>
      <Grid container className={clsx(baseClasses.container, classes.subContainer)}>
        <Grid item xs={8}>
          <Typography
            component="h1"
            variant="h3"
            className={clsx(baseClasses.title, classes.title)}
          >
            Create account
          </Typography>
        </Grid>
      </Grid>
      <Grid item container xs={12} className={clsx(baseClasses.container, classes.subContainer)}>
        {renderBackButton()}
        <Grid item>
          <Paper elevation={3} className={baseClasses.paperPopup}>
            <Formik
              initialValues={initialValues}
              validationSchema={currentValidationSchema}
              onSubmit={_handleSubmit}
            >
              {renderForm}
            </Formik>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SignupPage;
