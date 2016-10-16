import { combineReducers } from 'redux';
import user from './userReducer';
import eventRequest from './eventRequestReducer';
import budgetRequests from './budgetRequestReducer';
import clients from './clientReducer';

const rootReducer = combineReducers({
  user,
  eventRequest,
  budgetRequests,
  clients,
});

export default rootReducer;
