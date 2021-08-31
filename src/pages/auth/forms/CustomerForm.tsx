/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import { CustomerFormModel } from '../../../model/auth';

interface Props {
  formField: typeof CustomerFormModel.formField;
}

const CustomerForm: React.FC<Props> = ({ formField }) => {
  return <span></span>;
};

export default CustomerForm;
