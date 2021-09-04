import React, { useEffect, useState, useContext } from 'react';
import { Typography } from '@material-ui/core';
import { FastField, FormikHelpers } from 'formik';
import { Link, useHistory } from 'react-router-dom';
import MailOutlineOutlined from '@material-ui/icons/MailOutlineOutlined';

import { LoginFormModel } from '../../model/auth';
import { forgotPasswordValidation } from '../../model/auth/validationSchema';
import AuthContext from '../../hooks/useAuth';
import baseStyles from '../../style/styles';
import PATHS from '../../utils/routes';
import MyForm from '../../components/MyForm';
import { AppError } from '../../model/http';
import AuthPage from '../../components/AuthPage';
import IllustrationPage from '../../components/IllustrationPage';
import DebouncedInput from '../../components/formFields/DebouncedInput';

const { formField } = LoginFormModel;

const initialValues = {
  [formField.email.name]: '',
};

const formId = 'forgotPasswordForm';
const TIME_OUT = 2500;

type Values = typeof initialValues;

interface Props {
  email: { name: string; label: string };
  onChange: (e: React.ChangeEvent<string>) => void;
}

const EmailField: React.FC<Props> = ({ email, onChange }) => (
  <FastField
    name={email.name}
    placeholder={email.label}
    aria-label={email.label}
    Icon={MailOutlineOutlined}
    autoComplete={email.name}
    onChange={onChange}
    variant="outlined"
    component={DebouncedInput}
    fullWidth
  />
);

const ForgotPasswordPage: React.FC = () => {
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

  const Form = (
    <MyForm
      errors={error?.message}
      handleSubmit={handleSubmit}
      validationSchema={forgotPasswordValidation}
      initialValues={initialValues}
      footer={FormFooter}
      formId={formId}
      isSubmitting={isLoading}
      form={(h) => <EmailField email={email} onChange={h} />}
    >
      {EmailField}
    </MyForm>
  );

  return successMessage ? (
    <IllustrationPage
      title="Email has been sent!"
      subtitle="Please check your inbox and click in the received link to reset a password"
      imageAlt="Representing the sending of email"
      imagePath="/email-sent.svg"
    />
  ) : (
    <AuthPage title="Forgot password">{Form}</AuthPage>
  );
};

export default ForgotPasswordPage;
