import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function jobApplicationReducer(state = initialState.jobApplications, action) {
  switch(action.type) {
    case types.LOAD_JOB_APPLICATIONS_SUCCESS:
      return action.jobApplications;

		case types.ADD_NEW_JOB_APPLICATION_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.jobApplications)
      ];
    default:
      return state;
  }
}
