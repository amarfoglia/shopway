import React from 'react';
import { FieldProps, getIn } from 'formik';
import { TextField } from '@material-ui/core';

const InputField: React.FC<FieldProps> = ({ form, field, ...rest }) => {
  const errorText = getIn(form.touched, field.name) && getIn(form.errors, field.name);
  // const { errorText, ...rest } = props;
  // const [field, meta] = useField(rest.field);

  return <TextField error={!!errorText} helperText={errorText} {...field} {...rest} fullWidth />;
};

export default InputField;
