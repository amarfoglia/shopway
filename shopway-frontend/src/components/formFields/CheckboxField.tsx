import React, { ChangeEvent } from 'react';
import { at } from 'lodash';
import { FieldProps, useField } from 'formik';
import { Checkbox, FormControl, FormControlLabel, FormHelperText } from '@material-ui/core';

interface Props {
  label: string;
}

const CheckboxField: React.FC<Props & FieldProps> = (props) => {
  const { label, ...rest } = props;
  const [field, meta, helper] = useField(rest.field);
  const { setValue } = helper;

  function _renderHelperText() {
    const [touched, error] = at(meta, 'touched', 'error');
    if (touched && error) {
      return <FormHelperText>{error}</FormHelperText>;
    }
  }

  function _onChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.checked);
  }

  return (
    <FormControl {...rest}>
      <FormControlLabel
        value={field.checked}
        checked={field.checked}
        control={<Checkbox {...field} onChange={_onChange} />}
        label={label}
      />
      {_renderHelperText()}
    </FormControl>
  );
};

export default CheckboxField;
