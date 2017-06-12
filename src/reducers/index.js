import { combineReducers } from 'redux-immutable';
import globals from './globals';

const applicationReducers = {
  globals,
};

export default function createReducer() {
  return combineReducers(applicationReducers);
}
