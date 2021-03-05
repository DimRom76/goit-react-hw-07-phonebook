import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import userAction from './auth-actions';

const initialUserState = { name: null, email: null };
const setUser = (_, { payload }) => payload.user;
const user = createReducer(initialUserState, {
  [userAction.registrationUserSuccess]: setUser,
  [userAction.loginUserSuccess]: setUser,
  [userAction.logoutUserSuccess]: () => initialUserState,
  [userAction.getCurrentUserSuccess]: (_, { payload }) => payload,
});

const initialToken = null;
const setToken = (_, { payload }) => payload.token;
const token = createReducer(initialToken, {
  [userAction.registrationUserSuccess]: setToken,
  [userAction.loginUserSuccess]: setToken,
  [userAction.logoutUserSuccess]: () => initialToken,
});

const setTrue = () => true;
const setFalse = () => false;

const loading = createReducer(false, {
  [userAction.registrationUserRequest]: setTrue,
  [userAction.registrationUserSuccess]: setFalse,
  [userAction.registrationUserError]: setFalse,
  [userAction.loginUserRequest]: setTrue,
  [userAction.loginUserSuccess]: setFalse,
  [userAction.loginUserError]: setFalse,
  [userAction.logoutUserRequest]: setTrue,
  [userAction.logoutUserSuccess]: setFalse,
  [userAction.logoutUserError]: setFalse,
  [userAction.getCurrentUserRequest]: setTrue,
  [userAction.getCurrentUserSuccess]: setFalse,
  [userAction.getCurrentUserError]: setFalse,
});

const setError = (_, { payload }) => payload;
const error = createReducer(null, {
  [userAction.registrationUserRequest]: () => '',
  [userAction.registrationUserSuccess]: () => '',
  [userAction.registrationUserError]: setError,
  [userAction.loginUserRequest]: () => '',
  [userAction.loginUserSuccess]: () => '',
  [userAction.loginUserError]: setError,
  [userAction.logoutUserRequest]: () => '',
  [userAction.logoutUserSuccess]: () => '',
  [userAction.logoutUserError]: setError,
  [userAction.getCurrentUserRequest]: () => '',
  [userAction.getCurrentUserSuccess]: () => '',
  [userAction.getCurrentUserError]: setError,
});

const isAuthenticated = createReducer(false, {
  [userAction.registrationUserSuccess]: setTrue,
  [userAction.loginUserSuccess]: setTrue,
  [userAction.logoutUserSuccess]: setFalse,
  [userAction.getCurrentUserSuccess]: setTrue,
  [userAction.registrationUserError]: setFalse,
  [userAction.loginUserError]: setFalse,
  [userAction.getCurrentUserError]: setFalse,
});

const userReducer = combineReducers({
  user,
  isAuthenticated,
  token,
  loading,
  error,
});

export default userReducer;
