import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function clientsReducer(state = initialState.clients, action) {
  console.log('client reducer called');
  switch(action.type) {
    case types.LOAD_CLIENTS_SUCCESS:
      return action.clients;

    default:
      console.log("reducer returning default state");
      return state;
  }
}
