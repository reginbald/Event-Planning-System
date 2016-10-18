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
        console.log("GOT THE RESPONSE EVENTS: ", response.body);
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

export function getEventsAndTasksSuccess(result) {
  return { type: types.PREPARE_EVENTS_AND_TASKS, result}
}

/*
* Returns array of objects on the form
*[{id:eventid ..., Applications:[{id: taskid}...]}]
*/
export function getEventsAndTasks(departmentid) {
  console.log("GET EVENTS AND TATSKS WAS CALLED");
  console.log('did: ', departmentid);
  return dispatch => {
    return request
    .get(API_PATH + 'department/' + departmentid + '/event')
    .set('Accept', 'application/json')
    .then(response => {
      console.log('THE API CALL RETURNS SOMETHING', response);
      if(response) {
        console.log("GOT THE RESPONSE EVENTS AND TASKS: ", response.body);
        dispatch(getEventsAndTasksSuccess(response.body));
      }
      else{
        // Do something here if we have time
      }
    }).catch(error => {
      throw(error);
    });
  };
}
