import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function userReducer(state = initialState.user, action) {
  console.log("Reducer printing the receiving action");
  console.log(action);
  switch(action.type) {
    case types.USER_LOGIN_SUCCESS:
      return action.user;

    default:
      return state;
  }
}
