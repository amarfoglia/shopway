import { useFormikContext } from 'formik';
import React from 'react';
import ImageUploader from '../../../components/ImageUploader';
import { CustomerFormModel } from '../../../model/validation';
import User from '../../../model/users/user';

interface Props {
  formField: typeof CustomerFormModel.formField;
  onChange: (e: React.ChangeEvent<string>) => void;
}

const CustomerFields: React.FC<Props> = ({ formField: { photo } }) => {
  const { values, setFieldValue } = useFormikContext<{ user: User }>();
  const inputParams = {
    id: 'customer-photo-input',
    inputName: photo.name,
    onImageUpload: (image: File) => setFieldValue(photo.name, image),
  };
  return (
    <div style={{ display: 'block ruby' }}>
      <ImageUploader input={inputParams} image={values.user.photo as File} />
    </div>
  );
};

export default CustomerFields;
