
import { combineReducers } from 'redux';

import drawer from './drawer';
import cardNavigation from './cardNavigation';
import {credentials} from './user';

export default combineReducers({
  drawer,
  cardNavigation,
  credentials
});
