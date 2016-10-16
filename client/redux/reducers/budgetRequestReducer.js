import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function budgetRequestReducer(state = initialState.budgetRequests, action) {
  switch(action.type) {
    case types.LOAD_BUDGET_REQUESTS_SUCCESS:
      return action.budgetRequests;

    default:
      return state;
  }
}
