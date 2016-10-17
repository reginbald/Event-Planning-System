import request from 'superagent';
import API_PATH from './apiConfig';
import * as types from './actionTypes';

export function createApplicationSuccess(application) {
  return {type: types.CREATE_APPLICATION_SUCCESS, application};
}

export function createTaskForApplicationSuccess(tasks) {
  return {type: types.CREATE_TASK_SUCCESS, task};
}

export function createApplicationAndTasksRequest(data) {
  return dispatch => {
    return request
    .get(API_PATH + 'request/financial')
    .set('Accept', 'application/json')
    .then(response => {
      if(response) {
        dispatch(loadBudgetRequestSuccess(response.body));
      }
      else{
        // Do something here if we have time
      }
    }).catch(error => {
      throw(error);
    });
  };
}

/**
* data contains eventid and departmentid
* /api/event/:eid/department/:did/tasks
*/
export function getTasksForEventAndDepartment(data){
  const eventid = data.eventid;
  const departmentid = data.departmentid;
    return request
    .get(API_PATH + 'event/' + eventid + '/department/' + departmentid + '/tasks')
    .set('Accept', 'application/json');
}
