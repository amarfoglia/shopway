import React from 'react';
import PropTypes from 'prop-types';
import { at } from 'lodash';
import { FieldProps, useField } from 'formik';
import { FormControl, Select, MenuItem, FormHelperText } from '@material-ui/core';

interface Props {
  data: string[];
  label: string;
}

const SelectField: React.FC<Props & FieldProps> = (props) => {
  const { data, label, ...rest } = props;
  const [field, meta] = useField(rest.field);
  const { value: selectedValue } = field;
  const [touched, error] = at(meta, 'touched', 'error');
  const isError = touched && error && true;
  function _renderHelperText() {
    if (isError) {
      return <FormHelperText>{error}</FormHelperText>;
    }
  }

  return (
    <FormControl {...rest} error={isError}>
      <Select
        {...field}
        value={selectedValue ? selectedValue : 'none'}
        style={{ color: selectedValue ? 'inherit' : 'grey' }}
      >
        <MenuItem value={'none'} disabled>
          {label}
        </MenuItem>
        {data.map((item, index) => (
          <MenuItem key={index} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
      {_renderHelperText()}
    </FormControl>
  );
};

SelectField.defaultProps = {
  data: [],
};

SelectField.propTypes = {
  data: PropTypes.array.isRequired,
};

export default SelectField;
