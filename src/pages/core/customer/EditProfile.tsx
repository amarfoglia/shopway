import React, { useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import ProfilePage from '../common/ProfilePage';
import AuthContext from '../../../hooks/useAuth';
import MyForm from '../../../components/MyForm';
import { FormikHelpers } from 'formik';

import MailOutlineOutlined from '@material-ui/icons/MailOutlineOutlined';
import PermIdentityOutlined from '@material-ui/icons/PermIdentityOutlined';
import { Field } from 'formik';
import { SignupFormModel } from '../../../model/auth';
import DebouncedInput from '../../../components/formFields/DebouncedInput';
import { editProfileValidation } from '../../../model/auth/validationSchema';

interface FieldsProps {
  formField: typeof SignupFormModel.formField;
  onChange: (e: React.ChangeEvent<string>) => void;
}

const Fields: React.FC<FieldsProps> = ({ formField: { email, fullName }, onChange }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Field
          key={email.name}
          name={email.name}
          placeholder={email.label}
          aria-label={email.label}
          Icon={MailOutlineOutlined}
          variant="outlined"
          onChange={onChange}
          component={DebouncedInput}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <Field
          key={fullName.name}
          name={fullName.name}
          placeholder={fullName.label}
          aria-label={fullName.label}
          Icon={PermIdentityOutlined}
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
  fullName?: string;
  email?: string;
};

interface Props {
  userInfo: Values;
}

const { formField } = SignupFormModel;

const UpdateForm: React.FC<Props> = ({ userInfo: { fullName = '', email = '' } }) => {
  const handleSubmit = (values: Values, helpers: FormikHelpers<Values>) => {
    const { email, fullName } = values;
    console.log(email, fullName);
    helpers.setSubmitting(false);
  };

  return (
    <MyForm
      // errors={error?.message}
      initialValues={{ fullName, email }}
      handleSubmit={handleSubmit}
      validationSchema={editProfileValidation}
      formId={'update-user-form'}
      isSubmitting={false}
      form={(h) => <Fields onChange={h} formField={formField} />}
      submitText="Update"
    />
  );
};

const CustomerProfile = (): React.ReactElement => {
  const { user } = useContext(AuthContext);
  const currentValues = { fullName: user?.fullName, email: user?.email };
  const sections = [{ node: <UpdateForm userInfo={currentValues} /> }];

  return (
    <ProfilePage
      topTitle="Edit profile"
      name={user?.fullName}
      subinfo1={user?.role}
      sections={sections}
    />
  );
};

export default CustomerProfile;
