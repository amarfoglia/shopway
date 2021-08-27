import { Field } from 'formik';
import * as React from 'react';
import { InputField } from '../../../components/formFields';
import { SellerFormModel } from '../../../model/auth';

interface Props {
  formField: typeof SellerFormModel.formField;
}

const SellerForm: React.FC<Props> = ({ formField: { store, address, city } }) => {
  return (
    <React.Fragment>
      <Field
        name={store.name}
        label={store.label}
        autoComplete={store.name}
        component={InputField}
      />
      <Field
        name={address.name}
        label={address.label}
        autoComplete={address.name}
        component={InputField}
      />
      <Field name={city.name} label={city.label} autoComplete={city.name} component={InputField} />
    </React.Fragment>
  );
};

export default SellerForm;
