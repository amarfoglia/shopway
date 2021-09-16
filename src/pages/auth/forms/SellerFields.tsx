import React, { useMemo } from 'react';
import { Grid } from '@material-ui/core';
import LocationCityOutlined from '@material-ui/icons/LocationCityOutlined';
import PhoneOutlined from '@material-ui/icons/PhoneOutlined';
import LocationOnOutlined from '@material-ui/icons/LocationOnOutlined';
import StorefrontOutlined from '@material-ui/icons/StorefrontOutlined';

import { Field, useFormikContext } from 'formik';
import { SellerFormModel } from '../../../model/auth';
import { TextFieldProps } from 'material-ui';
import DebouncedInput from '../../../components/formFields/DebouncedInput';
import ImageUploader from '../../../components/ImageUploader';
import Store from '../../../model/users/store';

type SellerFields = typeof SellerFormModel.formField;

interface Props {
  formField: SellerFields;
}

const SellerForm: React.FC<Props & TextFieldProps> = ({
  formField: { storeName, address, city, phone, logo },
  onChange,
}) => {
  const { values, setFieldValue } = useFormikContext<{ store: Store }>();
  const { store } = values;
  const inputParams = {
    id: 'SellerImageUploader',
    inputName: logo.name,
    onImageUpload: (image: File) => setFieldValue(logo.name, image),
  };
  const Uploader = useMemo(
    () => <ImageUploader input={inputParams} image={store.logo as File} />,
    [store.logo],
  );
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {Uploader}
      </Grid>
      <Grid item xs={12}>
        <Field
          key={storeName.name}
          placeholder={storeName.label}
          aria-label={storeName.label}
          autoComplete={storeName.name}
          variant="outlined"
          name={storeName.name}
          Icon={StorefrontOutlined}
          onChange={onChange}
          component={DebouncedInput}
          value={store.name}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <Field
          key={city.name}
          placeholder={city.label}
          aria-label={city.label}
          autoComplete={city.name}
          variant="outlined"
          name={city.name}
          Icon={LocationCityOutlined}
          onChange={onChange}
          component={DebouncedInput}
          value={store.city}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <Field
          key={address.name}
          placeholder={address.label}
          aria-label={address.label}
          autoComplete={address.name}
          variant="outlined"
          name={address.name}
          Icon={LocationOnOutlined}
          onChange={onChange}
          component={DebouncedInput}
          value={store.address}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <Field
          key={phone.name}
          placeholder={phone.label}
          aria-label={phone.label}
          autoComplete={phone.name}
          variant="outlined"
          name={phone.name}
          Icon={PhoneOutlined}
          onChange={onChange}
          component={DebouncedInput}
          value={store.phone}
          fullWidth
        />
      </Grid>
    </Grid>
  );
};

export default SellerForm;
