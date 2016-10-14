import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function userReducer(state = initialState.user, action) {
  console.log("Reducer printing the receiving action");
  console.log(action);
  switch(action.type) {
    case types.USER_LOGIN_SUCCESS:
      console.log('reducer received login success');
      console.log(action);
      console.log(action.user);
      return Object.Assign({}, state,{
        authed: true
      });

    default:
      console.log("reducer returning default state");
      return state;
  }
}
