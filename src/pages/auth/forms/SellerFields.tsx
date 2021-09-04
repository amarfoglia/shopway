import React from 'react';
import { Grid } from '@material-ui/core';
import LocationCityOutlined from '@material-ui/icons/LocationCityOutlined';
import PhoneOutlined from '@material-ui/icons/PhoneOutlined';
import LocationOnOutlined from '@material-ui/icons/LocationOnOutlined';
import StorefrontOutlined from '@material-ui/icons/StorefrontOutlined';

import { FastField } from 'formik';
import { SellerFormModel } from '../../../model/auth';
import { TextFieldProps } from 'material-ui';
import DebouncedInput from '../../../components/formFields/DebouncedInput';

interface Props {
  formField: typeof SellerFormModel.formField;
}

const SellerForm: React.FC<Props & TextFieldProps> = ({
  formField: { storeName, address, city, phone },
  onChange,
}) => (
  <Grid container spacing={2}>
    {/* <Grid item xs={12}>
        <ImageUploader
          key="SellerImageUploader"
          inputName={logo.name}
          onImageUpload={(image) => setFieldValue(logo.name, image)}
        />
      </Grid> */}
    <Grid item xs={12}>
      <FastField
        key={storeName.name}
        placeholder={storeName.label}
        aria-label={storeName.label}
        autoComplete={storeName.name}
        variant="outlined"
        name={storeName.name}
        Icon={StorefrontOutlined}
        onChange={onChange}
        component={DebouncedInput}
        fullWidth
      />
    </Grid>
    <Grid item xs={12}>
      <FastField
        key={city.name}
        placeholder={city.label}
        aria-label={city.label}
        autoComplete={city.name}
        variant="outlined"
        name={city.name}
        Icon={LocationCityOutlined}
        onChange={onChange}
        component={DebouncedInput}
        fullWidth
      />
    </Grid>
    <Grid item xs={12}>
      <FastField
        key={address.name}
        placeholder={address.label}
        aria-label={address.label}
        autoComplete={address.name}
        variant="outlined"
        name={address.name}
        Icon={LocationOnOutlined}
        onChange={onChange}
        component={DebouncedInput}
        fullWidth
      />
    </Grid>
    <Grid item xs={12}>
      <FastField
        key={phone.name}
        placeholder={phone.label}
        aria-label={phone.label}
        autoComplete={phone.name}
        variant="outlined"
        name={phone.name}
        Icon={PhoneOutlined}
        onChange={onChange}
        component={DebouncedInput}
        fullWidth
      />
    </Grid>
  </Grid>
);

export default SellerForm;
