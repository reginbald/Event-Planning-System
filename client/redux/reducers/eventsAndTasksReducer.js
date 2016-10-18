import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function eventsAndTasksReducer(state = initialState.eventsAndTasks, action) {
  switch(action.type) {
    case types.PREPARE_EVENTS_AND_TASKS:
      return action.result;

    case types.CREATE_NEW_TASK_SUCCESS:
      return state; //TODO: do something here

    /*case types.CREATE_APPLICATION_SUCCESS:
      return state;//TODO: do something here
      */

    default:
      return state;
  }
}
