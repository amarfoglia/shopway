import React, { lazy, useContext, useState } from 'react';
import { Fab, Grid, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { FormikHelpers, FormikValues } from 'formik';
import { Link } from 'react-router-dom';
import ArrowBackIosOutlined from '@material-ui/icons/ArrowBackIosOutlined';
import { useMutation } from 'react-query';
import { CustomerFormModel, SellerFormModel, SignupFormModel } from '../../model/validation';
import { signupValidation } from '../../model/validation/validationSchema';
import initialValues from '../../model/validation/initialFormValues';
import PATHS from '../../utils/routes';
import baseStyles from '../../style/styles';
import AuthContext from '../../hooks/useAuth';
import AuthPage from '../../components/AuthPage';
import MyForm from '../../components/MyForm';
import { AppError } from '../../model/http';
import Role from '../../model/users/role';
import { Payload } from '../../utils/axiosClient';
import User from '../../model/users/user';
import Store from '../../model/users/store';

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
  role === Role.CUSTOMER ? STEPS.STEP_3C : STEPS.STEP_3S;

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

interface SignupProps {
  user: User;
  store?: Store;
  photo?: File;
}

const useStyles = makeStyles({
  backButton: {
    boxShadow:
      '0px 3px 5px -1px rgba(0,0,0,0.2),' +
      '0px 6px 10px 0px rgba(0,0,0,0.14),' +
      '0px 1px 18px 0px rgba(0,0,0,0.12)',
  },
});

const SignupPage: React.FC = () => {
  const { register } = useContext(AuthContext);
  const classes = useStyles();
  const {
    error,
    isLoading,
    mutate: userSignup,
  } = useMutation<Payload<User>, AppError, SignupProps>(register);
  const [activeStep, setActiveStep] = useState(STEPS.STEP_1);
  const currentValidationSchema = signupValidation[activeStep];
  const isLastStep = activeStep === STEPS.STEP_3C || activeStep === STEPS.STEP_3S;
  const baseClasses = baseStyles();

  const submitForm = (values: FormikValues) => {
    const { user, store } = values;
    const { logo, ..._store } = store;
    userSignup({ user, store: _store, photo: logo });
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
      <Fab color="primary" aria-label="back" onClick={handleBack} className={classes.backButton}>
        <ArrowBackIosOutlined />
      </Fab>
    </Grid>
  );

  const renderBackButton = () => {
    if (activeStep > STEPS.STEP_1) return BackButton;
  };

  const nextStep = (helpers: FormikHelpers<FormikValues>, step: number) => {
    setActiveStep(step);
    helpers.setTouched({});
    helpers.setSubmitting(false);
  };

  const handleSubmit = (values: FormikValues, helpers: FormikHelpers<FormikValues>) => {
    switch (activeStep) {
      case STEPS.STEP_1:
        nextStep(helpers, STEPS.STEP_2);
        break;
      case STEPS.STEP_2:
        nextStep(helpers, getStepBasedOnRole(values.user.role));
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
        validateOnBlur={false}
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
