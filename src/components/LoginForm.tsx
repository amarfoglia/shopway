import * as React from 'react';
import { Button } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { TextFormField } from './MyField';
import * as yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

interface Props {
  onSubmit: (email: string, password: string) => void;
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export const LoginForm: React.FC<Props> = ({ onSubmit }) => {
  const classes = useStyles();
  const emptyFields = { email: '', password: '' };
  return (
    <Formik
      validationSchema={schema}
      initialValues={emptyFields}
      onSubmit={({ email, password }) => {
        onSubmit(email, password);
      }}
    >
      {() => (
        <Form className={classes.root}>
          <div>
            <Field
              placeholder="Email"
              name="email"
              autoComplete="email"
              component={TextFormField}
            />
            <Field
              placeholder="Password"
              name="password"
              type="password"
              autoComplete="current-password"
              component={TextFormField}
            />
          </div>
          <Button type="submit" variant="outlined" size="large">
            submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};
