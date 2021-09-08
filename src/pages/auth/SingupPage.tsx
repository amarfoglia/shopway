import React, { lazy, useContext, useState } from 'react';
import { Fab, Grid, LinearProgress, Typography } from '@material-ui/core';
import { FormikHelpers } from 'formik';
import { Link } from 'react-router-dom';
import ArrowBackIosOutlined from '@material-ui/icons/ArrowBackIosOutlined';

import { CustomerFormModel, SellerFormModel, SignupFormModel } from '../../model/auth';
import { signupValidation } from '../../model/auth/validationSchema';
import initialValues from '../../model/auth/initialFormValues';
import { Roles } from '../../model/User';
import PATHS from '../../utils/routes';
import baseStyles from '../../style/styles';
import AuthContext from '../../hooks/useAuth';
import AuthPage from '../../components/AuthPage';
import MyForm from '../../components/MyForm';
import { AppError } from '../../model/http';

const SellerFields = lazy(() => import('./forms/SellerFields'));
const CustomerFields = lazy(() => import('./forms/CustomerFields'));
const UserFields = lazy(() => import('./forms/UserFields'));
const RoleFields = lazy(() => import('./forms/RoleFields'));

enum STEPS {
  STEP_1 = 0,
  STEP_2 = 1,
  STEP_3C = 2,
  STEP_3S = 3,
}

const getStepOffset = (step: number) => (step === STEPS.STEP_3S ? 2 : 1);
const getStepBasedOnRole = (role: string) =>
  role === Roles.CUSTOMER.value ? STEPS.STEP_3C : STEPS.STEP_3S;

const { formId, formField: userFormField } = SignupFormModel;
const { formField: sellerFormField } = SellerFormModel;
const { formField: customerFormField } = CustomerFormModel;

type ChangeHandler = (e: React.ChangeEvent<string>) => void;

const formComponents = new Map([
  [
    STEPS.STEP_1,
    (onChange: ChangeHandler) => (
      <UserFields key="UserFields" onChange={onChange} formField={userFormField} />
    ),
  ],
  [
    STEPS.STEP_2,
    (onChange: ChangeHandler) => (
      <RoleFields key="RoleFields" onChange={onChange} formField={userFormField} />
    ),
  ],
  [
    STEPS.STEP_3C,
    (onChange: ChangeHandler) => (
      <CustomerFields key="CustomerFields" onChange={onChange} formField={customerFormField} />
    ),
  ],
  [
    STEPS.STEP_3S,
    (onChange: ChangeHandler) => (
      <SellerFields key="SellerFields" onChange={onChange} formField={sellerFormField} />
    ),
  ],
]);

type Values = typeof initialValues;

const SignupPage: React.FC = () => {
  const { register, isLoading } = useContext(AuthContext);
  const [error, setError] = useState<AppError>();
  const [activeStep, setActiveStep] = useState(STEPS.STEP_1);
  const currentValidationSchema = signupValidation[activeStep];
  const isLastStep = activeStep === STEPS.STEP_3C || activeStep === STEPS.STEP_3S;
  const baseClasses = baseStyles();

  const submitForm = (values: Values) => {
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
    register(
      user,
      (_) => setError(undefined),
      (e) => setError(e),
    );
  };

  const FormFooter = (
    <Typography variant="body2">
      Already have an account?&nbsp;
      <Link to={PATHS.SIGN_IN} className={baseClasses.link}>
        Sign in
      </Link>
    </Typography>
  );

  const handleBack = () => setActiveStep(activeStep - getStepOffset(activeStep));

  const BackButton = (
    <Grid item className={baseClasses.backFabGrid}>
      <Fab color="primary" aria-label="back">
        <ArrowBackIosOutlined onClick={handleBack} />
      </Fab>
    </Grid>
  );

  const renderBackButton = () => {
    if (activeStep > STEPS.STEP_1) return BackButton;
  };

  const nextStep = (helpers: FormikHelpers<Values>, step: number) => {
    setActiveStep(step);
    helpers.setTouched({});
    helpers.setSubmitting(false);
  };

  const handleSubmit = (values: Values, helpers: FormikHelpers<Values>) => {
    switch (activeStep) {
      case STEPS.STEP_1:
        nextStep(helpers, STEPS.STEP_2);
        break;
      case STEPS.STEP_2:
        nextStep(helpers, getStepBasedOnRole(values['role']));
        break;
      case STEPS.STEP_3C:
      case STEPS.STEP_3S:
        submitForm(values);
        break;
    }
  };

  return (
    <AuthPage title="Create account" header={renderBackButton()}>
      <MyForm
        errors={error?.message}
        handleSubmit={handleSubmit}
        validationSchema={currentValidationSchema}
        initialValues={initialValues}
        footer={FormFooter}
        formId={formId}
        submitText={isLastStep ? 'Confirm' : 'Next'}
        isSubmitting={isLoading}
        form={(h) => (
          <React.Suspense fallback={<LinearProgress />}>
            {formComponents.get(activeStep)?.(h)}
          </React.Suspense>
        )}
      />
    </AuthPage>
  );
};

export default SignupPage;
