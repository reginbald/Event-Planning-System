
import mockLoginApi from '../../api/mockLoginApi';
import * as types from './actionTypes';
import { browserHistory } from  'react-router';

/**
* Param creds: object
*/
export function userLoginSuccess(creds) {
  return { type: types.USER_LOGIN_SUCCESS, creds };
}
export function userLoginError(creds) {
  console.log('dispo error');
  return { type: types.USER_LOGIN_ERROR, creds}
}

export function loginuser(creds) {
  return (dispatch) => {
    return mockLoginApi.loginUser(creds).then(response => {
      if(response){
        dispatch(userLoginSuccess);
        return browserHistory.push("/profile");
      }
      else{
      /*
      * Do something here if we have time
      */
      }
    }).catch(error => {
      throw(error);
    });
  };
}
