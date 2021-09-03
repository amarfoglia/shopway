import React from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { ReactNode } from 'react';
import baseStyles, { authStyles } from '../style/styles';

interface Props {
  title: string;
  header?: ReactNode;
}

// const renderErrors = (errors: string) => (
//   <Typography variant="body2" color="error">
//     {errors}
//   </Typography>
// );

// const renderForm = (
//   formId: string,
//   FormFields: React.ReactNode,
//   buttonText: string,
//   isLoading: boolean,
//   footer?: React.ReactNode,
//   errors?: string,
// ) => (
//   <Form id={formId}>
//     <Grid container spacing={3}>
//       <Grid item xs={12}>
//         {errors && renderErrors(errors)}
//       </Grid>
//       <Grid item xs={12}>
//         {FormFields}
//       </Grid>
//       <Grid item xs={12}>
//         <LoadButton
//           isSubmitting={isLoading}
//           text={buttonText}
//           variant="contained"
//           color="primary"
//           fullWidth
//         />
//       </Grid>
//       {footer && (
//         <Grid item xs={12}>
//           {footer}
//         </Grid>
//       )}
//     </Grid>
//   </Form>
// );

const AuthPage: React.FC<Props & ReactNode> = (props) => {
  const classes = baseStyles();
  const authClasses = authStyles();
  const { title, header } = props;

  return (
    <Grid container className={clsx(classes.container, authClasses.container)}>
      <Grid container className={clsx(classes.container, authClasses.subContainer)}>
        <Grid item xs={8}>
          <Typography
            component="h1"
            variant="h3"
            className={clsx(classes.title, authClasses.title)}
          >
            {title}
          </Typography>
        </Grid>
      </Grid>
      <Grid item container xs={12} className={clsx(classes.container)}>
        {header && header}
        <Grid item>
          <Paper elevation={3} className={classes.paperPopup}>
            {props.children}
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AuthPage;
