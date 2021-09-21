import React, { useCallback, useEffect, useState } from 'react';
import { TextFieldProps } from '@material-ui/core/TextField';
import InputField from './InputField';
import { FieldProps } from 'formik';
import { useDebouncedCallback } from 'use-debounce';
import { SvgIconComponent } from '@material-ui/icons';

interface Props {
  Icon?: SvgIconComponent;
}

const TIME_OUT = 100;

const DebouncedInput: React.FC<FieldProps & TextFieldProps & Props> = ({
  value,
  onChange,
  ...rest
}) => {
  const [innerValue, setInnerValue] = useState<string>('');

  useEffect(() => {
    setInnerValue(value ? (value as string) : '');
  }, [value]);

  const debounceOnChange = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => onChange?.(event),
    TIME_OUT,
  );

  const handleOnChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    const newValue = event.currentTarget.value;
    setInnerValue(newValue);
    debounceOnChange(event);
  }, []);

  return <InputField value={innerValue} onChange={handleOnChange} {...rest} />;
};

export default DebouncedInput;
