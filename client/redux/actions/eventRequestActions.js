import request from 'superagent';
import API_PATH from './apiConfig';
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
    return request
    .post(API_PATH + 'request/event')
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
    return request
    .get(API_PATH + 'request/event')
    .set('Accept', 'application/json')
    .then(response => {
      if(response) {
        dispatch(loadEventRequestSuccess(response.body));
      }
      else{
        // Do something here if we have time
      }
    }).catch(error => {
      throw(error);
    });
  };
}

export function updateEventRequestSuccess(eventrequest) {
  return {type: types.UPDATE_EVENT_REQUEST_SUCCESS, eventrequest};
}

export function updateEventRequest(id, data) {
  return dispatch => {
    return request
    .put(API_PATH + 'request/event/' + id)
    .send(data)
    .set('Accept', 'application/json')
    .then(response => {
      if(response) {
        dispatch(updateEventRequestSuccess(response.body));
      }
      else{
        // Do something here if we have time
      }
    }).catch(error => {
      throw(error);
    });
  };
}

export function updateEventRequestStatus(data) {
  const id = data.id;
  const status = { status: data.status };
  return dispatch => {
    return request
    .put(API_PATH + 'request/event/' + id + '/status')
    .send(status)
    .set('Accept', 'application/json')
    .then(response => {
      if(response) {
        dispatch(updateEventRequestStatusSuccess(response.body));
      }
      else{
        // Do something here if we have time
      }
    }).catch(error => {
      throw(error);
    });
  };
}
