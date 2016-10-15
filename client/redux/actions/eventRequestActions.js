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
  // TODO: send request when api is ready
  console.log('inside action with data', data);
  return dispatch => {
    return dispatch(newEventRequestSuccess);
  }
}
