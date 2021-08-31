import * as React from 'react';
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
import { Field, FieldProps, getIn } from 'formik';
import { useState } from 'react';
import { SignupFormModel } from '../../../model/auth';
import { Roles } from '../../../model/User';
import { roleStyles } from '../../../style/styles';

interface Props {
  formField: typeof SignupFormModel.formField;
}

const { CUSTOMER, SELLER } = Roles;

interface RadioProps {
  options: [{ label: string; value: string }];
}

interface PaperRoleProps {
  isSelected: boolean;
  role: string;
}

const RoleGroup: React.FC<FieldProps & RadioProps> = ({ form, field, options, ...rest }) => {
  const classes = roleStyles();
  const errorText = getIn(form.touched, field.name) && getIn(form.errors, field.name);
  const [selectedRole, setSelectedRole] = useState(field.value ?? Roles.CUSTOMER);

  const PaperRole: React.FC<PaperRoleProps> = ({ isSelected, role }) => (
    <Paper className={classes.imageRoleContainer}>
      <img
        src={process.env.PUBLIC_URL + `/${role}.png`}
        className={isSelected ? classes.selectedRoleImage : classes.unselectedRoleImage}
      />
      <Typography
        variant="subtitle2"
        className={isSelected ? classes.selectedRoleTitle : classes.unselectedRoleTitle}
      >
        {role}
      </Typography>
    </Paper>
  );

  const renderRoles = () =>
    Array.from(options.entries()).map(([i, v]) => (
      <Grid item key={i} xs={6}>
        <FormControlLabel
          className={classes.label}
          value={v.value}
          control={<Radio className={classes.radio} onClick={() => setSelectedRole(v.value)} />}
          label={<PaperRole isSelected={selectedRole === v.value} role={v.value} />}
        />
      </Grid>
    ));

  return (
    <FormControl error={!!errorText} component="fieldset">
      <RadioGroup {...field} {...rest} value={selectedRole}>
        <Grid container spacing={2}>
          {renderRoles()}
        </Grid>
      </RadioGroup>
      <FormHelperText>{errorText}</FormHelperText>
    </FormControl>
  );
};

const SellerForm: React.FC<Props> = ({ formField: { role } }) => {
  return (
    <Grid item xs={12}>
      <Field
        name={role.name}
        aria-label={role.label}
        options={[CUSTOMER, SELLER]}
        component={RoleGroup}
      />
    </Grid>
  );
};

export default SellerForm;
