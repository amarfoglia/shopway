import React, { useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import ProfilePage from '../common/ProfilePage';
import AuthContext from '../../../hooks/useAuth';
import MyForm from '../../../components/MyForm';
import { FormikHelpers, Field, useFormikContext } from 'formik';
import { useMutation } from 'react-query';
import IconButton from '@material-ui/core/IconButton';
import PhotoCameraOutlined from '@material-ui/icons/PhotoCameraOutlined';

import MailOutlineOutlined from '@material-ui/icons/MailOutlineOutlined';
import PermIdentityOutlined from '@material-ui/icons/PermIdentityOutlined';
import DebouncedInput from '../../../components/formFields/DebouncedInput';
import { editProfileValidation } from '../../../model/validation/validationSchema';
import { AppError } from '../../../model/http';
import User from '../../../model/users/user';
import { ImageInput } from '../../../components/ImageUploader';
import { Payload } from '../../../utils/axiosClient';

interface FieldsProps {
  onChange: (e: React.ChangeEvent<string>) => void;
}

const Fields: React.FC<FieldsProps> = ({ onChange }) => {
  const { values, setFieldValue } = useFormikContext<Values>();

  const PhotoField = () => (
    <ImageInput
      id={'customer-photo-input'}
      inputName={'customer-photo'}
      onImageUpload={(f) => setFieldValue('photo', f)}
    />
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Field
          key="email"
          name="email"
          placeholder="Email"
          aria-label="Email"
          Icon={MailOutlineOutlined}
          variant="outlined"
          onChange={onChange}
          component={DebouncedInput}
          value={values.email}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <Field
          key="fullName"
          name="fullName"
          placeholder="FullName"
          aria-label="FullName"
          Icon={PermIdentityOutlined}
          variant="outlined"
          onChange={onChange}
          component={DebouncedInput}
          value={values.fullName}
          fullWidth
        />
      </Grid>
      <Field
        key="photo"
        name="photo"
        placeholder="Photo"
        aria-label="Photo"
        onChange={onChange}
        component={PhotoField}
        value={values.photo}
      />
    </Grid>
  );
};

type Values = {
  fullName?: string;
  email?: string;
  photo?: File;
};

const UpdateForm: React.FC = () => {
  const { updateMe, user } = useContext(AuthContext);
  const {
    error,
    isLoading,
    mutate: patchUser,
  } = useMutation<Payload<User>, AppError, Partial<User>>(updateMe);

  const handleSubmit = (values: Values, helpers: FormikHelpers<Values>) => {
    const { email, fullName, photo } = values;
    if (email && fullName) {
      patchUser({ email, fullName, photo });
    }
    helpers.setSubmitting(false);
  };

  const initValues = {
    fullName: user?.fullName,
    email: user?.email,
    photo: user?.photo,
  };

  return (
    <MyForm
      errors={error?.message}
      initialValues={initValues}
      handleSubmit={handleSubmit}
      validationSchema={editProfileValidation}
      formId={'update-user-form'}
      isSubmitting={isLoading}
      form={(h) => <Fields onChange={h} />}
      submitText="Update"
    />
  );
};

const CustomerEditProfile = (): React.ReactElement => {
  const { user } = useContext(AuthContext);
  const sections = [{ node: <UpdateForm /> }];
  const id = 'customer-photo-input';

  return (
    <React.Fragment>
      <ProfilePage
        topTitle="Edit profile"
        rightChild={
          <div>
            <label htmlFor={id}>
              <IconButton style={{ padding: 0 }} color="primary" component="span">
                <PhotoCameraOutlined titleAccess="change user photo" />
              </IconButton>
            </label>
          </div>
        }
        name={user?.fullName}
        subinfo1={user?.role}
        imagePath={user?.photo as string}
        sections={sections}
      />
    </React.Fragment>
  );
};

export default CustomerEditProfile;
