//TODO create a mock login api
//uncomment the line below when mockapi is ready
//import LoginApi from '../../api/mockLoginApi';
import * as types from './actionTypes';

/**
* Param data: object
*/
export function userLoginSuccess(data) {
  return { type: types.USER_LOGIN_SUCCESS, data };
}
