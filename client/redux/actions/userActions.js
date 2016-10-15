
import mockLoginApi from '../../api/mockLoginApi';
import * as types from './actionTypes';
import { browserHistory } from  'react-router';

/**
* Param creds: object
*/
export function userLoginSuccess(user) {
  return {type: types.USER_LOGIN_SUCCESS, user};
}
export function userLoginError(user) {
  return { type: types.USER_LOGIN_ERROR, user}
}

export function loginuser(creds) {
  return dispatch => {
    return mockLoginApi.loginUser(creds).then(user => {
      if(user) {
        dispatch(userLoginSuccess(user));
        return browserHistory.push("/profile");
      }
      else{
      /*
      * Do something here if we have time
      */
         dispatch(userLoginError(user));
      }
    }).catch(error => {
      throw(error);
    });
  };
}
