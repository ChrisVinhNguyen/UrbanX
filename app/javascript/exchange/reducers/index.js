import { combineReducers } from 'redux';
import userReducer from './userReducer';
import itemsReducer from './itemsReducer';
import flashReducer from './flashReducer';
import loadingReducer from './loadingReducer';

export default combineReducers({
  user: userReducer,
  items: itemsReducer,
  flash: flashReducer,
  loading: loadingReducer,
});