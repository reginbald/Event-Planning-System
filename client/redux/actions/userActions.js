//TODO create a mock login api
//uncomment the line below when mockapi is ready
import mockLoginApi from '../../api/mockLoginApi';
import * as types from './actionTypes';

/**
* Param data: object
*/
export function userLoginSuccess(creds) {
  return { type: types.USER_LOGIN_SUCCESS, creds };
}
export function userLoginError(creds) {
  return { type: types.USER_LOGIN_ERROR, creds}
}

export function loginuser(creds) {
  return function(dispatch) {
    return mockLoginApi.loginUser(creds).then(response => {
      console.log('loginuser received response');
      console.log(response);
      response ? dispatch(userLoginError(creds)):dispatch(userLoginSuccess(creds));
    }).catch(error => {
      throw(error);
    });
  };
}
