import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function eventRequestReducer(state = initialState.eventrequests, action) {
  switch(action.type) {
    case types.LOAD_EVENT_REQUESTS_SUCCESS:
      return action.eventrequests

    case types.SEND_NEW_EVENT_REQUEST_SUCCESS:
      return state;

    case types.UPDATE_EVENT_REQUEST_STATUS_SUCCESS:
      let newState = [];
      for(let i = 0; i < state.length; i++){
        if(state[i].id === action.eventrequest.id) {
          state[i].status = action.eventrequest.status;
        }
        newState.push(state[i]);
      }

      return newState;

    default:
      return state;
  }
}
