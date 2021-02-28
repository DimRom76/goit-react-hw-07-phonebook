import React from 'react';

import { useFormik } from 'formik';
import * as yup from 'yup';

import InputAdornment from '@material-ui/core/InputAdornment';
import EmailIcon from '@material-ui/icons/Email';

import { Button, Paper, TextField } from '@material-ui/core';

import PasswordForm from './PasswordForm';
import s from './RegistrationView.module.css';

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(6, 'Password should be of minimum 6 characters length')
    .required('Password is required'),
});

function RegistrationView() {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  // passwordMatch = () => this.state.password === this.state.passwordConfrim;

  return (
    <div className={s.main}>
      <Paper className={s.paper}>
        <h2>Логин пользователя</h2>
        <form className={s.form} onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="email"
            style={{ marginTop: 10 }}
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            className={s.inputs}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon color="primary" />
                </InputAdornment>
              ),
            }}
          />
          <PasswordForm
            formik={formik}
            key="password"
            id="password"
            name="password"
            label="Password"
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button
            disableRipple
            variant="outlined"
            className={s.button}
            style={{ marginTop: 10 }}
            type="submit"
          >
            Login
          </Button>
        </form>
      </Paper>
    </div>
  );
}

export default RegistrationView;
