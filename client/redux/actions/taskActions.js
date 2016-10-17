import request from 'superagent';
import API_PATH from './apiConfig';
import * as types from './actionTypes';

export function getAllEmployeeTasksSuccess(tasks) {
  return {type: types.LOAD_EMPLOYEE_TASKS_SUCCESS, tasks };
}
export function getTasksForEmployee(id) {
  return dispatch => {
    return request
    .get(API_PATH +'employee/' + id + '/task' )
    .set('Accept', 'application/json')
    .then(tasks => {
      if(tasks) {
        dispatch(getAllEmployeeTasksSuccess(tasks.body));
      }
      else{
      /*
      * Do something here if we have time
      */
      }
    }).catch(error => {
      throw(error);
    });
  };
}
