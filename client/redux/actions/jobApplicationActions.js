import request from 'superagent';
import API_PATH from './apiConfig';
import * as types from './actionTypes';

export function getAllJobApplicationsSuccess(jobApplications) {
  return {type: types.LOAD_JOB_APPLICATIONS_SUCCESS, jobApplications };
}
export function getAllJobApplications() {
  return dispatch => {
    return request
    .get(API_PATH +'jobapplication')
    .set('Accept', 'application/json')
    .then(jobApplications => {
      if(jobApplications) {
        dispatch(getAllJobApplicationsSuccess(jobApplications.body));
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

export function addNewJobApplicationSuccess(jobapplication) {
  return {type: types.ADD_NEW_JOB_APPLICATION_SUCCESS, jobapplication };
}
export function addNewJobApplication(newJobApp) {
  return dispatch => {
    return request
    .post(API_PATH + 'jobapplication')
    .send(newJobApp)
    .set('Accept', 'application/json')
    .then(jobapplication => {
      if(jobapplication) {
        dispatch(addNewJobApplicationSuccess(jobapplication));
      }
      else{

      // Do something here if we have time

      }
    }).catch(error => {
      throw(error);
    });
  };
}