import React, { useContext, useState } from 'react';
import { Fab, Grid, Typography } from '@material-ui/core';
import { FormikHelpers } from 'formik';
import { Link } from 'react-router-dom';
import ArrowBackIosOutlined from '@material-ui/icons/ArrowBackIosOutlined';

import { SellerFields, CustomerFields, UserFields, RoleFields } from './forms';
import { CustomerFormModel, SellerFormModel, SignupFormModel } from '../../model/auth';
import { signupValidation } from '../../model/auth/validationSchema';
import initialValues from '../../model/auth/initialFormValues';
import { Roles } from '../../model/User';
import PATHS from '../../utils/routes';
import baseStyles from '../../style/styles';
import AuthContext from '../../hooks/useAuth';
import AuthPage from '../../components/AuthPage';
import MyForm from '../../components/MyForm';

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

const formComponents = new Map([
  [STEPS.STEP_1, <UserFields key="UserFields" formField={userFormField} />],
  [STEPS.STEP_2, <RoleFields key="RoleFields" formField={userFormField} />],
  [STEPS.STEP_3C, <CustomerFields key="CustomerFields" formField={customerFormField} />],
  [STEPS.STEP_3S, <SellerFields key="SellerFields" formField={sellerFormField} />],
]);

type Values = typeof initialValues;

const SignupPage: React.FC<void> = () => {
  const { register, error: signupError, isLoading } = useContext(AuthContext);
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
    register(user);
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
    <AuthPage title="Welcome back" header={renderBackButton()}>
      <MyForm
        errors={signupError}
        handleSubmit={handleSubmit}
        validationSchema={currentValidationSchema}
        initialValues={initialValues}
        footer={FormFooter}
        formId={formId}
        submitText={isLastStep ? 'Confirm' : 'Next'}
        isSubmitting={isLoading}
      >
        {formComponents.get(activeStep)}
      </MyForm>
    </AuthPage>
  );
};

export default SignupPage;
