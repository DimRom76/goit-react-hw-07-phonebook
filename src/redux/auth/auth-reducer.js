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

const setLoadingTrue = () => true;
const setLoadingFalse = () => false;
const loading = createReducer(false, {
  [userAction.registrationUserRequest]: setLoadingTrue,
  [userAction.registrationUserSuccess]: setLoadingFalse,
  [userAction.registrationUserError]: setLoadingFalse,
  [userAction.loginUserRequest]: setLoadingTrue,
  [userAction.loginUserSuccess]: setLoadingFalse,
  [userAction.loginUserError]: setLoadingFalse,
  [userAction.logoutUserRequest]: setLoadingTrue,
  [userAction.logoutUserSuccess]: setLoadingFalse,
  [userAction.logoutUserError]: setLoadingFalse,
  [userAction.getCurrentUserRequest]: setLoadingTrue,
  [userAction.getCurrentUserSuccess]: setLoadingFalse,
  [userAction.getCurrentUserError]: setLoadingFalse,
});

const setError = (_, { payload }) => payload;
const error = createReducer(null, {
  [userAction.registrationUserError]: setError,
  [userAction.loginUserError]: setError,
  [userAction.logoutUserError]: setError,
  [userAction.getCurrentUserError]: setError,
});

const userReducer = combineReducers({
  user,
  token,
  loading,
  error,
});

export default userReducer;
