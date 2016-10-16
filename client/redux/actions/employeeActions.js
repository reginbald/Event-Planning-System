import request from 'superagent';
import API_PATH from './apiConfig';
import * as types from './actionTypes';

export function loadEmployeesSuccess(employees) {
  return {type: types.LOAD_EMPLOYEES_SUCCESS, employees};
}

export function getAllEmployees() {
  return dispatch => {
    return request
    .get(API_PATH + 'employee')
    .set('Accept', 'application/json')
    .then(response => {
      if(response) {
        dispatch(loadEmployeesSuccess(response.body));
      }
      else{
        // Do something here if we have time
      }
    }).catch(error => {
      throw(error);
    });
  };
}