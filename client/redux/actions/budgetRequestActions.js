import request from 'superagent';
import API_PATH from './apiConfig';
import * as types from './actionTypes';

export function loadBudgetRequestSuccess(budgetRequests) {
  return {type: types.LOAD_BUDGET_REQUESTS_SUCCESS, budgetRequests};
}

export function getAllBudgetRequests() {
  return dispatch => {
    return request
    .get(API_PATH + 'request/financial')
    .set('Accept', 'application/json')
    .then(response => {
      if(response) {
        dispatch(loadBudgetRequestSuccess(response.body));
      }
      else{
        // Do something here if we have time
      }
    }).catch(error => {
      throw(error);
    });
  };
}