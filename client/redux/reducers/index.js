import { combineReducers } from 'redux';
import user from './userReducer';
import eventRequest from './eventRequestReducer';
import budgetRequests from './budgetRequestReducer';
import clients from './clientReducer';
import {productionEmployees, employees} from './employeeReducer';
import events from './eventReducer';
import resourceRequests from './resourceRequestReducer';

const rootReducer = combineReducers({
  user,
  eventRequest,
  budgetRequests,
  resourceRequests,
  clients,
  productionEmployees,
  employees,
  events,
});

export default rootReducer;
