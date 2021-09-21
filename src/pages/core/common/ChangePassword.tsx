import React, { useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import ProfilePage from './ProfilePage';
import AuthContext from '../../../hooks/useAuth';
import MyForm from '../../../components/MyForm';
import { FormikHelpers, Field, FormikValues } from 'formik';
import { useMutation } from 'react-query';

import LockOutlined from '@material-ui/icons/LockOutlined';
import DebouncedInput from '../../../components/formFields/DebouncedInput';
import { changePasswordValidation } from '../../../model/validation/validationSchema';
import { AppError } from '../../../model/http';
import User from '../../../model/users/user';
import { Payload } from '../../../utils/axiosClient';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

interface FieldsProps {
  onChange: (e: React.ChangeEvent<string>) => void;
}

const Fields: React.FC<FieldsProps> = ({ onChange }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Field
          key="passwordCurrent"
          name="fields.passwordCurrent"
          placeholder="Current password"
          aria-label="Current password"
          Icon={LockOutlined}
          variant="outlined"
          type="password"
          onChange={onChange}
          component={DebouncedInput}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <Field
          key="password"
          name="fields.password"
          placeholder="New password"
          aria-label="New password"
          Icon={LockOutlined}
          type="password"
          variant="outlined"
          onChange={onChange}
          component={DebouncedInput}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <Field
          key="passwordCurrent"
          name="fields.passwordConfirm"
          placeholder="Confirm password"
          aria-label="Confirm password"
          Icon={LockOutlined}
          type="password"
          variant="outlined"
          onChange={onChange}
          component={DebouncedInput}
          fullWidth
        />
      </Grid>
    </Grid>
  );
};

type Values = {
  passwordCurrent: string;
  password: string;
  passwordConfirm: string;
};

type FormValues = {
  fields: Values;
};

const initValues: FormValues = {
  fields: {
    passwordCurrent: '',
    password: '',
    passwordConfirm: '',
  },
};

const PasswordForm: React.FC = () => {
  const { changePassword } = useContext(AuthContext);
  const {
    data,
    error,
    isLoading,
    mutate: _changePassword,
  } = useMutation<Payload<User>, AppError, Values>(changePassword);

  const handleSubmit = (values: FormikValues, helpers: FormikHelpers<FormikValues>) => {
    const { fields } = values;
    _changePassword({ ...fields });
    helpers.setSubmitting(false);
  };

  const SuccessMessage = () => (
    <Alert severity="success" style={{ textAlign: 'left', borderRadius: 16 }}>
      <AlertTitle>Success</AlertTitle>
      Password has been changed!
    </Alert>
  );

  return data ? (
    <SuccessMessage />
  ) : (
    <MyForm
      errors={error?.message}
      initialValues={initValues}
      handleSubmit={handleSubmit}
      validationSchema={changePasswordValidation}
      formId={'change-password-form'}
      isSubmitting={isLoading}
      form={(h) => <Fields onChange={h} />}
      submitText="Update"
    />
  );
};

const ChangePasswordPage = (): React.ReactElement => {
  const sections = [{ node: <PasswordForm /> }];
  return (
    <React.Fragment>
      <ProfilePage topTitle="Change password" sections={sections} />
    </React.Fragment>
  );
};

export default ChangePasswordPage;
