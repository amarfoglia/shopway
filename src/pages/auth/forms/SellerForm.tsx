import * as React from 'react';
import { Grid } from '@material-ui/core';
import {
  LocationCityOutlined,
  LocationOnOutlined,
  PhoneOutlined,
  StorefrontOutlined,
} from '@material-ui/icons';
import { Field } from 'formik';
import { InputField } from '../../../components/formFields';
import { SellerFormModel } from '../../../model/auth';

interface Props {
  formField: typeof SellerFormModel.formField;
}

const SellerForm: React.FC<Props> = ({ formField: { storeName, address, city, phone } }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Field
          placeholder={storeName.label}
          aria-label={storeName.label}
          autoComplete={storeName.name}
          variant="outlined"
          name={storeName.name}
          Icon={StorefrontOutlined}
          component={InputField}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <Field
          placeholder={city.label}
          aria-label={city.label}
          autoComplete={city.name}
          variant="outlined"
          name={city.name}
          Icon={LocationCityOutlined}
          component={InputField}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <Field
          placeholder={address.label}
          aria-label={address.label}
          autoComplete={address.name}
          variant="outlined"
          name={address.name}
          Icon={LocationOnOutlined}
          component={InputField}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <Field
          placeholder={phone.label}
          aria-label={phone.label}
          autoComplete={phone.name}
          variant="outlined"
          name={phone.name}
          Icon={PhoneOutlined}
          component={InputField}
          fullWidth
        />
      </Grid>
    </Grid>
  );
};

export default SellerForm;
