import { updateReducer } from './Reducer/index';
import { combineReducers } from 'redux';

export const rootReducer = combineReducers(
  {
    updateState: updateReducer
  }
);
