import { combineReducers } from 'redux';
import userReducer from './userReducer';
import itemsReducer from './itemsReducer';
import flashReducer from './flashReducer';

export default combineReducers({
  user: userReducer,
  items: itemsReducer,
  flash: flashReducer
});