import { combineReducers } from 'redux';
import user from './userReducer';
import eventRequest from './eventRequestReducer';
import budgetRequests from './budgetRequestReducer';
import {clients, clientEvents} from './clientReducer';
import {productionEmployees, employees} from './employeeReducer';
import events from './eventReducer';
import resourceRequests from './resourceRequestReducer';
import jobApplications from './jobApplicationReducer';
import {tasks} from './taskReducer';

const rootReducer = combineReducers({
  user,
  eventRequest,
  budgetRequests,
  resourceRequests,
  clients,
  productionEmployees,
  employees,
  events,
  jobApplications,
  clientEvents,
  tasks
});

export default rootReducer;
