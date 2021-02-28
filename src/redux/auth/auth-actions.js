import { createAction } from '@reduxjs/toolkit';

const loginUserRequest = createAction('auth/loginUserRequest');
const loginUserSuccess = createAction('auth/loginUserSuccess');
const loginUserError = createAction('auth/loginUserError');

const logoutUserRequest = createAction('auth/logoutUserRequest');
const logoutUserSuccess = createAction('auth/logoutUserSuccess');
const logoutUserError = createAction('auth/logoutUserError');

const registrationUserRequest = createAction('auth/registrationUserRequest');
const registrationUserSuccess = createAction('auth/registrationUserSuccess');
const registrationUserError = createAction('auth/registrationUserError');

const getCurrentUserRequest = createAction('auth/getCurrentUserRequest');
const getCurrentUserSuccess = createAction('auth/getCurrentUserSuccess');
const getCurrentUserError = createAction('auth/getCurrentUserError');

const actions = {
  loginUserRequest,
  loginUserSuccess,
  loginUserError,
  logoutUserRequest,
  logoutUserSuccess,
  logoutUserError,
  registrationUserRequest,
  registrationUserSuccess,
  registrationUserError,
  getCurrentUserRequest,
  getCurrentUserSuccess,
  getCurrentUserError,
};

export default actions;
