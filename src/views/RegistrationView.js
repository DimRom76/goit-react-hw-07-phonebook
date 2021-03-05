import React from 'react';
import { connect } from 'react-redux';

import { useFormik } from 'formik';
import * as yup from 'yup';

import InputAdornment from '@material-ui/core/InputAdornment';
import NameIcon from '@material-ui/icons/SupervisorAccount';
import EmailIcon from '@material-ui/icons/Email';

import { Button, Paper, TextField } from '@material-ui/core';

import PasswordForm from './PasswordForm';
import { authOperations } from '../redux/auth';
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
    .min(6, 'Password should be of minimum 7 characters length')
    .required('Password is required'),
  confirmPassword: yup
    .string('Enter your password')
    .required('Confirm your password')
    .min(6, 'Password should be of minimum 7 characters length')
    .oneOf([yup.ref('password')], 'Password does not match'),
});

function RegistrationView({ registrationUser, errorRegistration }) {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      onSubmitForm(values, resetForm);
    },
  });

  function onSubmitForm(values, resetForm) {
    const newUserCredentials = {
      name: values.name,
      email: values.email,
      password: values.password,
    };
    registrationUser(newUserCredentials);
    resetForm();
  }

  function isValid() {
    if (formik.values.name === '') {
      return false;
    }
    if (formik.values.email === '') {
      return false;
    }
    if (formik.values.password === '') {
      return false;
    }
    if (formik.values.passwordConfrim === '') {
      return false;
    }
    return true;
  }

  return (
    <div className={s.main}>
      <Paper className="paper">
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
            key="password"
            name="password"
            label="Password"
            handleChange={formik.handleChange}
            value={formik.values.password}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <PasswordForm
            key="confirmPassword"
            name="confirmPassword"
            label="Confirm password"
            handleChange={formik.handleChange}
            value={formik.values.confirmPassword}
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
            disabled={!isValid()}
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

const mapDispatchToProps = {
  registrationUser: authOperations.registrationUser,
};

export default connect(null, mapDispatchToProps)(RegistrationView);
