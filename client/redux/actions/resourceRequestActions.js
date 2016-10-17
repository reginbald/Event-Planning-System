import request from 'superagent';
import API_PATH from './apiConfig';
import * as types from './actionTypes';

export function loadResourceRequestSuccess(resourceRequests) {
  return {type: types.LOAD_RESOURCE_REQUESTS_SUCCESS, resourceRequests};
}

export function getAllResourceRequests() {
  return dispatch => {
    return request
    .get(API_PATH + 'request/recruitment')
    .set('Accept', 'application/json')
    .then(response => {
      if(response) {
        dispatch(loadResourceRequestSuccess(response.body));
      }
      else{
        // Do something here if we have time
      }
    }).catch(error => {
      throw(error);
    });
  };
}