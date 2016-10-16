import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function budgetRequestReducer(state = initialState.employees, action) {
  switch(action.type) {
    case types.LOAD_EMPLOYEES_SUCCESS:
      return action.employees;

    default:
      return state;
  }
}
