import React, { useEffect, useContext } from 'react';
import { Typography } from '@material-ui/core';
import { Field, FormikHelpers } from 'formik';
import { Link, useHistory } from 'react-router-dom';
import MailOutlineOutlined from '@material-ui/icons/MailOutlineOutlined';
import { useMutation } from 'react-query';

import { LoginFormModel } from '../../model/validation';
import { forgotPasswordValidation } from '../../model/validation/validationSchema';
import AuthContext from '../../hooks/useAuth';
import baseStyles from '../../style/styles';
import Routes from '../../utils/routes';
import MyForm from '../../components/MyForm';
import { AppError } from '../../model/http';
import AuthPage from '../../components/AuthPage';
import IllustrationPage from '../../components/IllustrationPage';
import DebouncedInput from '../../components/formFields/DebouncedInput';
import { Payload } from '../../utils/axiosClient';
import User from '../../model/users/user';

const { formField } = LoginFormModel;

const initialValues = {
  [formField.email.name]: '',
};

const formId = 'forgotPasswordForm';
const TIME_OUT = 2500;

type Values = typeof initialValues;

interface Props {
  email: typeof formField.email;
  onChange: (e: React.ChangeEvent<string>) => void;
}

const EmailField: React.FC<Props> = ({ email, onChange }) => (
  <Field
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
  const baseClasses = baseStyles();
  const history = useHistory();
  const { email } = formField;
  const { forgotPassword } = useContext(AuthContext);
  const {
    data,
    error,
    isLoading,
    mutate: userForgotPassword,
  } = useMutation<Payload<User>, AppError, string>(forgotPassword);

  useEffect(() => {
    const timer = setTimeout(() => {
      data?.message && history.push(Routes.HOME);
    }, TIME_OUT);
    return () => clearTimeout(timer);
  }, [data?.message]);

  const handleSubmit = (values: Values, helpers: FormikHelpers<Values>) => {
    userForgotPassword(values.email);
    helpers.setSubmitting(isLoading);
  };

  const FormFooter = (
    <Typography variant="body2">
      Don&apos;t have an account?&nbsp;
      <Link to={Routes.SIGN_UP} className={baseClasses.link}>
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

  return data?.message ? (
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
