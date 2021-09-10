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

type SellerFields = typeof SellerFormModel.formField;

interface Props {
  formField: SellerFields;
}

const SellerForm: React.FC<Props & TextFieldProps> = ({
  formField: { storeName, address, city, phone, logo },
  onChange,
}) => {
  const { values, setFieldValue } = useFormikContext<SellerFields>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const storeLogo = values.logo as any;
  const Uploader = useMemo(
    () => (
      <ImageUploader
        id="SellerImageUploader"
        image={storeLogo}
        inputName={logo.name}
        onImageUpload={(image) => setFieldValue(logo.name, image)}
      />
    ),
    [storeLogo],
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
          value={values.storeName}
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
          value={values.city}
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
          value={values.address}
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
          value={values.phone}
          fullWidth
        />
      </Grid>
    </Grid>
  );
};

export default SellerForm;
