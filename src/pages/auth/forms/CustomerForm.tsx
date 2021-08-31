import { Grid } from '@material-ui/core';
import { PermIdentityOutlined, PhoneIphoneOutlined } from '@material-ui/icons';
import { Field } from 'formik';
import * as React from 'react';
import { InputField } from '../../../components/formFields';
import { CustomerFormModel } from '../../../model/auth';

interface Props {
  formField: typeof CustomerFormModel.formField;
}

const CustomerForm: React.FC<Props> = ({ formField: { firstname, lastname, phone } }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Field
          name={firstname.name}
          placeholder={firstname.label}
          aria-label={firstname.label}
          autoComplete={firstname.name}
          variant="outlined"
          Icon={PermIdentityOutlined}
          component={InputField}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <Field
          placeholder={lastname.label}
          aria-label={lastname.label}
          autoComplete={lastname.name}
          variant="outlined"
          Icon={PermIdentityOutlined}
          name={lastname.name}
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
          Icon={PhoneIphoneOutlined}
          name={phone.name}
          component={InputField}
          fullWidth
        />
      </Grid>
    </Grid>
  );
};

export default CustomerForm;
