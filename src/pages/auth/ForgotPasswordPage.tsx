import React, { useEffect, useState, useContext } from 'react';
import { Typography } from '@material-ui/core';
import { Field, FormikHelpers } from 'formik';
import { Link, useHistory } from 'react-router-dom';
import MailOutlineOutlined from '@material-ui/icons/MailOutlineOutlined';

import { LoginFormModel } from '../../model/auth';
import { forgotPasswordValidation } from '../../model/auth/validationSchema';
import AuthContext from '../../hooks/useAuth';
import baseStyles from '../../style/styles';
import PATHS from '../../utils/routes';
import MyForm from '../../components/MyForm';
import { InputField } from '../../components/formFields';
import { AppError } from '../../model/http';
import AuthPage from '../../components/AuthPage';
import IllustrationPage from '../../components/IllustrationPage';

const { formField } = LoginFormModel;

const initialValues = {
  [formField.email.name]: '',
};

const formId = 'forgotPasswordForm';
const TIME_OUT = 2500;

type Values = typeof initialValues;

const ForgotPasswordPage: React.FC<void> = () => {
  const { forgotPassword, isLoading } = useContext(AuthContext);
  const [error, setError] = useState<AppError>();
  const [successMessage, setSuccessMessage] = useState<string>();
  const baseClasses = baseStyles();
  const history = useHistory();
  const { email } = formField;

  useEffect(() => {
    const timer = setTimeout(() => {
      successMessage && history.push(PATHS.HOME);
    }, TIME_OUT);
    return () => clearTimeout(timer);
  }, [successMessage]);

  const handleSubmit = (values: Values, helpers: FormikHelpers<Values>) => {
    const { email } = values;
    forgotPassword(
      { email },
      ({ message }) => {
        setSuccessMessage(message);
      },
      setError,
    );
    helpers.setSubmitting(isLoading);
  };

  const FormFooter = (
    <Typography variant="body2">
      Don&apos;t have an account?&nbsp;
      <Link to={PATHS.SIGN_UP} className={baseClasses.link}>
        Sign up
      </Link>
    </Typography>
  );

  const EmailField = (
    <Field
      name={email.name}
      placeholder={email.label}
      aria-label={email.label}
      Icon={MailOutlineOutlined}
      autoComplete={email.name}
      variant="outlined"
      component={InputField}
      fullWidth
    />
  );

  const Form = (
    <MyForm
      errors={error?.message}
      handleSubmit={handleSubmit}
      validationSchema={forgotPasswordValidation}
      initialValues={initialValues}
      footer={FormFooter}
      formId={formId}
      isSubmitting={isLoading}
    >
      {EmailField}
    </MyForm>
  );

  return successMessage ? (
    <IllustrationPage
      title="Email has been sent!"
      subtitle="Please check your inbox and click in the received link to reset a password"
      imagePath="/email-sent.svg"
    />
  ) : (
    <AuthPage title="Forgot password">{Form}</AuthPage>
  );
};

export default ForgotPasswordPage;
