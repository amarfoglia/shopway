import { Field } from 'formik';
import * as React from 'react';
import { RadioGroupField } from '../../../components/formFields';
import { SignupFormModel } from '../../../model/auth';
import { Roles } from '../../../model/User';

interface Props {
  formField: typeof SignupFormModel.formField;
}

const { CUSTOMER, SELLER } = Roles;

const SellerForm: React.FC<Props> = ({ formField: { role } }) => {
  return (
    <React.Fragment>
      <Field
        name={role.name}
        aria-label={role.label}
        options={[CUSTOMER, SELLER]}
        fullWidth={true}
        component={RadioGroupField}
      />
    </React.Fragment>
  );
};

export default SellerForm;
