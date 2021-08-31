import React from 'react';
import { FieldProps, getIn } from 'formik';
import { InputAdornment, TextField } from '@material-ui/core';
import { SvgIconComponent } from '@material-ui/icons';

interface Props {
  Icon?: SvgIconComponent;
}

const InputField: React.FC<FieldProps & Props> = ({ form, field, Icon, ...rest }) => {
  const errorText = getIn(form.touched, field.name) && getIn(form.errors, field.name);
  const color = errorText ? 'error' : field.value ? 'primary' : 'inherit';

  const renderIcon = () =>
    Icon ? (
      <InputAdornment position="start">
        <Icon color={color} />
      </InputAdornment>
    ) : undefined;

  return (
    <TextField
      error={!!errorText}
      helperText={errorText}
      {...field}
      {...rest}
      InputProps={{
        startAdornment: renderIcon(),
      }}
    />
  );
};

export default InputField;
