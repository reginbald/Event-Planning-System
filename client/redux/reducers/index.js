import { combineReducers } from 'redux';
import user from './userReducer';
import eventRequest from './eventRequestReducer';
import budgetRequests from './budgetRequestReducer';
import clients from './clientReducer';
import employees from './employeeReducer';

const rootReducer = combineReducers({
  user,
  eventRequest,
  budgetRequests,
  clients,
  employees
});

export default rootReducer;
