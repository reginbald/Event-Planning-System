import request from 'superagent';
import * as types from './actionTypes';

/**
* Customer service officer sends new event request
* Param data: New Event Request object
*/
export function newEventRequestSuccess(data) {
  return {type: types.SEND_NEW_EVENT_REQUEST_SUCCESS, data};
}
export function newEventRequestError(data) {
  return { type: types.SEND_NEW_EVENT_REQUEST_FAILURE, data}
}

export function createNewEventRequest(data) {
  return dispatch => {
    return request.post('api/eventrequest')
    .send(data)
    .set('Accept', 'application/json')
    .then(response => {
      if(response) {
      }
      else{
        // Do something here if we have time
      }
    }).catch(error => {
      throw(error);
    });
  };
}

export function loadEventRequestSuccess(eventrequests) {
  return {type: types.LOAD_EVENT_REQUESTS_SUCCESS, eventrequests};
}

export function getAllEventRequests() {
  return dispatch => {
    return request.get('api/eventrequest')
    .set('Accept', 'application/json')
    .then(response => {
      if(response) {
        console.log('received response: ', response);
        dispatch(loadEventRequestSuccess(response.body));
        //return browserHistory.push("/profile");
      }
      else{
        // Do something here if we have time
      }
    }).catch(error => {
      throw(error);
    });
  };
}
