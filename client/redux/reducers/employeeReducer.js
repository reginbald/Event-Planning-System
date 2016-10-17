import * as types from '../actions/actionTypes';
import initialState from './initialState';

export function departmentEmloyees(state = initialState.departmentEmloyees, action) {
  switch(action.type) {
    case types.LOAD_EMPLOYEES_FOR_PRODUCTION_DEPARTMENT_SUCCESS:
      return action.employees;
    default:
      return state;
    }
  }

export function employees(state = initialState.employees, action) {
  switch(action.type) {
    case types.LOAD_EMPLOYEES_SUCCESS:
      return action.employees;

    default:
      return state;
  }
}

export function departmentid(state = initialState.departmentid, action) {
  switch(action.type) {
    case types.SET_EMPLOYEE_DEPARTMENT_ID:
      return action.id;

     default:
      return state;
  }
}
