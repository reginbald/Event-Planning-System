import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function userReducer(state = initialState.user, action) {
  // Mockapi returns array while server returns object
  // break user variable correctly up first before
  // using it to return a new state.
  let user = action.user;
  if(Array.isArray(action.user)){
    user = user[0];
  }

  switch(action.type) {
    case types.USER_LOGIN_SUCCESS:
      return Object.assign({}, state,{
        authed: true,
        id: user.id,
        username: user.username,
        password: '',
        access: user.access,
        name: user.name,
        email: user.email,
        departmentid: user.departmentid,
        job_title: user.job_title
      })
    case types.USER_LOGIN_ERROR:
      console.log('error was dispatched');
      return;
    default:
      return state;
  }
}
