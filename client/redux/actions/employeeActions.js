import request from 'superagent';
import API_PATH from './apiConfig';
import * as types from './actionTypes';

export function getEmployeesForDepartmentSuccess(employees) {
  return {type: types.LOAD_EMPLOYEES_FOR_PRODUCTION_DEPARTMENT_SUCCESS, employees};
}

export function getEmployeesForDepartment(id) {
  return dispatch => {
    return request
    .get(API_PATH + 'department/' + id +'/employee')
    .set('Accept', 'application/json')
    .then(response => {
      if(response) {
        dispatch(getEmployeesForDepartmentSuccess(response.body));
      }
      else{
        // Do something here if we have time
      }
    }).catch(error => {
      throw(error);
    });
  };
}

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
