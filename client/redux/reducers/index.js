import { combineReducers } from 'redux';
import user from './userReducer';
import eventRequest from './eventRequestReducer';
import clients from './clientsReducer';

const rootReducer = combineReducers({
  user,
  eventRequest,
  clients,
});

export default rootReducer;
