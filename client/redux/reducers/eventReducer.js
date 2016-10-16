import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function eventReducer(state = initialState.events, action) {
  switch(action.type) {
    case types.LOAD_ALL_EVENTS_SUCCESS:
      return action.events;

    case types.CREATE_NEW_EVENT_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.event)
      ];

    default:
      return state;
  }
}
