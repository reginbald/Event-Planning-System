import { combineReducers } from 'redux';
import user from './userReducer';
import eventRequest from './eventRequestReducer';
import budgetRequests from './budgetRequestReducer';
import {departmentEmloyees, employees, departmentid} from './employeeReducer';
import {clients, clientEvents} from './clientReducer';
import events from './eventReducer';
import resourceRequests from './resourceRequestReducer';
import jobApplications from './jobApplicationReducer';
import { tasks } from './taskReducer';

const rootReducer = combineReducers({
  user,
  eventRequest,
  budgetRequests,
  resourceRequests,
  clients,
  departmentEmloyees,
  employees,
  events,
  jobApplications,
  departmentid,
  clientEvents,
  tasks
});

export default rootReducer;
