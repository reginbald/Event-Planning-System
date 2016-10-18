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
import eventsAndTasks from './eventsAndTasksReducer';

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
  tasks,
  eventsAndTasks
});

export default rootReducer;
