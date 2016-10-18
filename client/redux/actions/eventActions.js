import request from 'superagent';
import API_PATH from './apiConfig';
import * as types from './actionTypes';

export function createnewEventSuccess(event) {
  return { type: types.CREATE_NEW_EVENT_SUCCESS, event}
}


export function createNewEvent(newEvent) {
  // Extract necessary data from the event request object.
  return dispatch => {
    return request
    .post(API_PATH + 'event')
    .send(newEvent)
    .set('Accept', 'application/json')
    .then(response => {
      if(response) {
        console.log("got THE RESPONSE: ", response);
        dispatch(createnewEventSuccess(response[0]));
      }
      else{
        // Do something here if we have time
      }
    }).catch(error => {
      throw(error);
    });
  };
}

export function getAllEventsSuccess(events) {
  return { type: types.LOAD_ALL_EVENTS_SUCCESS, events}
}

export function getAllEvents() {
  return dispatch => {
    return request
    .get(API_PATH + 'event')
    .set('Accept', 'application/json')
    .then(response => {
      if(response) {
        dispatch(getAllEventsSuccess(response.body));
      }
      else{
        // Do something here if we have time
      }
    }).catch(error => {
      throw(error);
    });
  };
}
