import * as types from '../actions/actionTypes';
import initialState from './initialState';

export function productionEmployees(state = initialState.productionEmployees, action) {
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
