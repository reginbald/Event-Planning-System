import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function eventRequestReducer(state = initialState.eventrequests, action) {
  switch(action.type) {
    case types.LOAD_EVENT_REQUESTS_SUCCESS:
      return action.eventrequests;

    case types.SEND_NEW_EVENT_REQUEST_SUCCESS:
      return state;

    default:
      return state;
  }
}
