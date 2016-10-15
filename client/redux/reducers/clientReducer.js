import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function clientReducer(state = initialState.clients, action) {
  switch(action.type) {
    case types.LOAD_CLIENTS_SUCCESS:
      return action.clients;

    case types.ADD_NEW_CLIENT_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.client)
      ];
    default:
      console.log("reducer returning default state");
      return state;
  }
}
