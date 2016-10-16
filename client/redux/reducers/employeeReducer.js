import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function employeeReducer(state = initialState.productionEmployees, action) {
  switch(action.type) {
    case types.LOAD_EMPLOYEES_FOR_PRODUCTION_DEPARTMENT_SUCCESS:
      return action.employees;

    default:
      return state;
  }
}
