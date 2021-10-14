import React from 'react';
import { FieldProps, getIn } from 'formik';
import {
  FormControl,
  FormHelperText,
  FormLabel,
  RadioGroup,
  RadioGroupProps,
  FormControlLabel,
  Radio,
} from '@material-ui/core';

interface Props {
  legend: string;
  fullWidth: boolean;
  options: [
    {
      label: string;
      value: string;
    },
  ];
}

const RadioGroupField: React.FC<FieldProps & RadioGroupProps & Props> = ({
  form,
  field,
  legend,
  fullWidth,
  options,
  ...rest
}) => {
  const errorText = getIn(form.touched, field.name) && getIn(form.errors, field.name);
  return (
    <FormControl error={!!errorText} component="fieldset" fullWidth={fullWidth}>
      <FormLabel component="legend">{legend}</FormLabel>
      <RadioGroup {...field} {...rest}>
        {Array.from(options.entries()).map(([i, v]) => (
          <FormControlLabel key={i} value={v.value} control={<Radio />} label={v.label} />
        ))}
      </RadioGroup>
      <FormHelperText>{errorText}</FormHelperText>
    </FormControl>
  );
};

export default RadioGroupField;
