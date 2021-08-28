import { Field } from 'formik';
import * as React from 'react';
import { InputField } from '../../../components/formFields';
import { CustomerFormModel } from '../../../model/auth';

interface Props {
  formField: typeof CustomerFormModel.formField;
}

const CustomerForm: React.FC<Props> = ({ formField: { firstname, lastname, phone } }) => {
  return (
    <React.Fragment>
      <Field
        name={firstname.name}
        label={firstname.label}
        autoComplete={firstname.name}
        component={InputField}
      />
      <Field
        name={lastname.name}
        label={lastname.label}
        autoComplete={lastname.name}
        component={InputField}
      />
      <Field
        name={phone.name}
        label={phone.label}
        autoComplete={phone.name}
        component={InputField}
      />
    </React.Fragment>
  );
};

export default CustomerForm;
