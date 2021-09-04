import { useFormikContext } from 'formik';
import React from 'react';
import ImageUploader from '../../../components/ImageUploader';
import { CustomerFormModel } from '../../../model/auth';

interface Props {
  formField: typeof CustomerFormModel.formField;
  onChange: (e: React.ChangeEvent<string>) => void;
}

const CustomerFields: React.FC<Props> = ({ formField: { photo } }) => {
  const { setFieldValue } = useFormikContext();
  return (
    <ImageUploader
      id="CustomerImageUploader"
      inputName={photo.name}
      onImageUpload={(image) => setFieldValue(photo.name, image)}
    />
  );
};

export default CustomerFields;
