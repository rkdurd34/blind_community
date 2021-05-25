import { combineReducers } from "redux";

import test from './test';
import auth from './auth';
import board from './board';
import loading from './loading';
import common from './common';
import admin from './admin';

export default combineReducers({
  test,
  auth,
  board,
  loading,
  common,
  admin
});