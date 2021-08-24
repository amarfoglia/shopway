import * as React from 'react';
import { FieldProps, getIn } from 'formik';
import { TextField, TextFieldProps } from '@material-ui/core';

export const TextFormField: React.FC<FieldProps & TextFieldProps> = ({ field, form, ...props }) => {
  const errorText = getIn(form.touched, field.name) && getIn(form.errors, field.name);
  return (
    <TextField
      variant="outlined"
      label={props.placeholder}
      placeholder={props.placeholder}
      helperText={errorText}
      error={!!errorText}
      {...field}
      {...props}
    />
  );
};
