import * as types from '../actions/actionTypes';
import initialState from './initialState';

export function tasks(state = initialState.tasks, action) {
  switch(action.type) {
    case types.LOAD_EMPLOYEE_TASKS_SUCCESS:
      return action.tasks;

    default:
      return state;
  }
}
