import React from 'react';
import { Grid } from '@material-ui/core';
import CheckOutlined from '@material-ui/icons/CheckOutlined';
import LockOutlined from '@material-ui/icons/LockOutlined';
import MailOutlineOutlined from '@material-ui/icons/MailOutlineOutlined';
import PermIdentityOutlined from '@material-ui/icons/PermIdentityOutlined';

import { FastField } from 'formik';
import { SignupFormModel } from '../../../model/auth';
import { TextFieldProps } from 'material-ui';
import DebouncedInput from '../../../components/formFields/DebouncedInput';

interface Props {
  formField: typeof SignupFormModel.formField;
}

const UserFields: React.FC<Props & TextFieldProps> = ({
  formField: { email, fullName, password, passwordConfirm },
  onChange,
}) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FastField
          key={email.name}
          name={email.name}
          placeholder={email.label}
          aria-label={email.label}
          Icon={MailOutlineOutlined}
          autoComplete={email.name}
          variant="outlined"
          onChange={onChange}
          component={DebouncedInput}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <FastField
          key={fullName.name}
          name={fullName.name}
          placeholder={fullName.label}
          aria-label={fullName.label}
          Icon={PermIdentityOutlined}
          autoComplete={fullName.name}
          variant="outlined"
          onChange={onChange}
          component={DebouncedInput}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <FastField
          key={password.name}
          name={password.name}
          placeholder={password.label}
          aria-label={password.label}
          Icon={LockOutlined}
          autoComplete={password.name}
          variant="outlined"
          type="password"
          onChange={onChange}
          component={DebouncedInput}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <FastField
          key={passwordConfirm.name}
          name={passwordConfirm.name}
          placeholder={passwordConfirm.label}
          aria-label={passwordConfirm.label}
          Icon={CheckOutlined}
          autoComplete={passwordConfirm.name}
          variant="outlined"
          type="password"
          onChange={onChange}
          component={DebouncedInput}
          fullWidth
        />
      </Grid>
    </Grid>
  );
};

export default UserFields;
