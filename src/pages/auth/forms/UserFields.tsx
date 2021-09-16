import React from 'react';
import { Grid } from '@material-ui/core';
import CheckOutlined from '@material-ui/icons/CheckOutlined';
import LockOutlined from '@material-ui/icons/LockOutlined';
import MailOutlineOutlined from '@material-ui/icons/MailOutlineOutlined';
import PermIdentityOutlined from '@material-ui/icons/PermIdentityOutlined';

import { Field, useFormikContext } from 'formik';
import { SignupFormModel } from '../../../model/auth';
import { TextFieldProps } from 'material-ui';
import DebouncedInput from '../../../components/formFields/DebouncedInput';
import User from '../../../model/users/user';

type SignupFields = typeof SignupFormModel.formField;

interface Props {
  formField: SignupFields;
}

const UserFields: React.FC<Props & TextFieldProps> = ({
  formField: { email, fullName, password, passwordConfirm },
  onChange,
}) => {
  const { values } = useFormikContext<{ user: User }>();
  const { user } = values;
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Field
          key={email.name}
          name={email.name}
          placeholder={email.label}
          aria-label={email.label}
          Icon={MailOutlineOutlined}
          autoComplete={email.name}
          variant="outlined"
          onChange={onChange}
          component={DebouncedInput}
          value={user.email}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <Field
          key={fullName.name}
          name={fullName.name}
          placeholder={fullName.label}
          aria-label={fullName.label}
          Icon={PermIdentityOutlined}
          autoComplete={fullName.name}
          variant="outlined"
          onChange={onChange}
          component={DebouncedInput}
          value={user.fullName}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <Field
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
          value={user.password}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <Field
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
          value={user.passwordConfirm}
          fullWidth
        />
      </Grid>
    </Grid>
  );
};

export default UserFields;
