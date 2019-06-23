import { combineReducers } from 'redux';
import layout from './layout/reducers';
import address from './address/reducers';

export default combineReducers({
  layout,
  address,
});
