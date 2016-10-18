import request from 'superagent';
import API_PATH from './apiConfig';
import * as types from './actionTypes';
import * as eventActions from './eventActions';

export function createApplicationSuccess(result) {
  return {type: types.CREATE_APPLICATION_SUCCESS, result};
}

export function createApplication(data) {
  return dispatch => {
    return request
    .post(API_PATH + 'application')
    .send(data)
    .set('Accept', 'application/json')
    .then(response => {
      if(response) {
        console.log('application was created: ', response);
        console.log('sending get events and tasks again with did: ', data.departmentid);
        //eventActions.getEventsAndTasks(data.departmentid);
      }
      else{
        // Do something here if we have time
      }
    }).catch(error => {
      throw(error);
    });
  };
}
