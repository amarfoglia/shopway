import { Grid } from '@material-ui/core';
import { LocationCityOutlined, LocationOnOutlined, StorefrontOutlined } from '@material-ui/icons';
import { Field } from 'formik';
import * as React from 'react';
import { InputField } from '../../../components/formFields';
import { SellerFormModel } from '../../../model/auth';

interface Props {
  formField: typeof SellerFormModel.formField;
}

const SellerForm: React.FC<Props> = ({ formField: { store, address, city } }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Field
          placeholder={store.label}
          aria-label={store.label}
          autoComplete={store.name}
          variant="outlined"
          name={store.name}
          Icon={StorefrontOutlined}
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
    </Grid>
  );
};

export default SellerForm;
