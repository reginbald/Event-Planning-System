import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function eventsAndTasksReducer(state = initialState.eventsAndTasks, action) {
  switch(action.type) {
    case types.PREPARE_EVENTS_AND_TASKS:
      console.log("updating events and tasks");
      return action.result;

    case types.CREATE_NEW_TASK_SUCCESS:
      console.log('INSIDE CREATING NEW TASK IN THE REDUCER');
      console.log('this is the action object: ', action);
      return state; //TODO: do something here

    /*case types.CREATE_APPLICATION_SUCCESS:
      console.log('inside types.CREATE_APPLICATION_SUCCESS', action.result);
      return state;//TODO: do something here
      */

    default:
      return state;
  }
}
