import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function resourceRequestReducer(state = initialState.resourceRequests, action) {
  switch(action.type) {
    case types.LOAD_RESOURCE_REQUESTS_SUCCESS:
      return action.resourceRequests;

    case types.ADD_NEW_RESOURCE_REQUEST_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.resourceRequest)
      ];

    default:
      return state;
  }
}
