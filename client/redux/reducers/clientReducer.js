import * as types from '../actions/actionTypes';
import initialState from './initialState';

export function clients(state = initialState.clients, action) {
  switch(action.type) {
    case types.LOAD_CLIENTS_SUCCESS:
      return action.clients;

    case types.ADD_NEW_CLIENT_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.client)
      ];

    default:
      return state;
  }
}

export function clientEvents(state = initialState.clientEvents, action) {
  switch(action.type) {
    case types.LOAD_CLIENT_EVENTS_SUCCESS:
      return action.events;
    default:
      return state;
  }
}
