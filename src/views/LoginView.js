import React from 'react';
import { connect } from 'react-redux';

import { useFormik } from 'formik';
import * as yup from 'yup';

import InputAdornment from '@material-ui/core/InputAdornment';
import EmailIcon from '@material-ui/icons/Email';

import { Button, Paper, TextField } from '@material-ui/core';

import { authOperations } from '../redux/auth';
import PasswordForm from './PasswordForm';
import s from './RegistrationView.module.css';

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(6, 'Password should be of minimum 7 characters length')
    .required('Password is required'),
});

function LoginView({ loginUser }) {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      onSubmitForm(values, resetForm);
    },
  });

  function onSubmitForm(values, resetForm) {
    const newUserCredentials = {
      email: values.email,
      password: values.password,
    };
    loginUser(newUserCredentials);
    resetForm();
  }

  function isValid() {
    if (formik.values.email === '') {
      return false;
    }
    if (formik.values.password === '') {
      return false;
    }
    return true;
  }

  return (
    <div className={s.main}>
      <Paper className="paper">
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
            key="password"
            name="password"
            label="Password"
            handleChange={formik.handleChange}
            value={formik.values.password}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button
            disabled={!isValid()}
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

const mapDispatchToProps = {
  loginUser: authOperations.loginUser,
};

export default connect(null, mapDispatchToProps)(LoginView);
