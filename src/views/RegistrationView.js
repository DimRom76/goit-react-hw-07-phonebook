import React from 'react';

import { useFormik } from 'formik';
import * as yup from 'yup';

import InputAdornment from '@material-ui/core/InputAdornment';
import NameIcon from '@material-ui/icons/SupervisorAccount';
import EmailIcon from '@material-ui/icons/Email';

import { Button, Paper, TextField } from '@material-ui/core';

import PasswordForm from './PasswordForm';
import s from './RegistrationView.module.css';

const validationSchema = yup.object({
  name: yup
    .string('Enter your name')
    .min(3, 'Name should be of minimum 3 characters length')
    .required('Name is required'),
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(6, 'Password should be of minimum 6 characters length')
    .required('Password is required'),
  confirmPassword: yup
    .string('Enter your password')
    .required('Confirm your password')
    .oneOf([yup.ref('password')], 'Password does not match'),
});

function RegistrationView() {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
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
        <h2>Регистрация пользователя</h2>
        <form className={s.form} onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="name"
            style={{ marginTop: 10 }}
            name="name"
            label="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            className={s.inputs}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <NameIcon color="primary" />
                </InputAdornment>
              ),
            }}
          />
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
          <PasswordForm
            formik={formik}
            key="confirmPassword"
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm password"
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
          />
          <Button
            disableRipple
            variant="outlined"
            className={s.button}
            style={{ marginTop: 10 }}
            type="submit"
          >
            Join
          </Button>
        </form>
      </Paper>
    </div>
  );
}

export default RegistrationView;
