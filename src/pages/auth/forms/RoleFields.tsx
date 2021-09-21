import React from 'react';
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from '@material-ui/core';
import { Field, FieldProps, getIn, useFormikContext } from 'formik';
import { useState } from 'react';
import { SignupFormModel } from '../../../model/validation';
import { roleStyles } from '../../../style/styles';
import Image from 'material-ui-image';
import clsx from 'clsx';
import Role from '../../../model/users/role';
import User from '../../../model/users/user';

type SignupFields = typeof SignupFormModel.formField;

interface Props {
  formField: SignupFields;
  onChange: (e: React.ChangeEvent<string>) => void;
}

const { CUSTOMER, SELLER } = Role;

interface RadioProps {
  options: string[];
}

interface PaperRoleProps {
  isSelected: boolean;
  role: string;
}

const RoleGroup: React.FC<FieldProps & RadioProps> = ({ form, field, options, ...rest }) => {
  const classes = roleStyles();
  const errorText = getIn(form.touched, field.name) && getIn(form.errors, field.name);
  const [selectedRole, setSelectedRole] = useState(field.value ?? CUSTOMER);

  const PaperRole: React.FC<PaperRoleProps> = ({ isSelected, role }) => {
    const selectedClass = isSelected ? classes.selectedRolePaper : classes.unselectedRolePaper;
    return (
      <Paper className={clsx(classes.imageRoleContainer, selectedClass)}>
        <Image src={process.env.PUBLIC_URL + `/${role}.png`} alt={role} />
        <Typography variant="subtitle2">{role}</Typography>
      </Paper>
    );
  };

  const renderRole = (role: string) => (
    <Grid item key={role} xs={6}>
      <FormControlLabel
        className={classes.label}
        value={role}
        control={<Radio className={classes.radio} onClick={() => setSelectedRole(role)} />}
        label={<PaperRole isSelected={selectedRole === role} role={role} />}
      />
    </Grid>
  );

  return (
    <FormControl error={!!errorText} component="fieldset">
      <RadioGroup {...field} {...rest} value={selectedRole}>
        <Grid container spacing={2}>
          {options.map((o) => renderRole(o))}
        </Grid>
      </RadioGroup>
      <FormHelperText>{errorText}</FormHelperText>
    </FormControl>
  );
};

const RoleFields: React.FC<Props> = ({ formField: { role } }) => {
  const { values } = useFormikContext<{ user: User }>();
  return (
    <Field
      key={role.name}
      name={role.name}
      aria-label={role.label}
      options={[CUSTOMER, SELLER]}
      component={RoleGroup}
      value={values.user.role}
    />
  );
};

export default RoleFields;
