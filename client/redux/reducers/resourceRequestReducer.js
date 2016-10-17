import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function resourceRequestReducer(state = initialState.resourceRequests, action) {
  switch(action.type) {
    case types.LOAD_RESOURCE_REQUESTS_SUCCESS:
      return action.resourceRequests;

    default:
      return state;
  }
}
