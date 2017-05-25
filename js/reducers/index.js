
import { combineReducers } from 'redux';
import drawer from './drawer';
import cardNavigation from './cardNavigation';
import {credentials} from './user';
import {reducer as formReducer} from 'redux-form'

export default combineReducers({
  drawer,
  cardNavigation,
  credentials,
  form: formReducer
});
