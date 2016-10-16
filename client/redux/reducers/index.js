import { combineReducers } from 'redux';
import user from './userReducer';
import eventRequest from './eventRequestReducer';
import clients from './clientReducer';
import employees from './employeeReducer';

const rootReducer = combineReducers({
  user,
  eventRequest,
  clients,
  employees
});

export default rootReducer;
