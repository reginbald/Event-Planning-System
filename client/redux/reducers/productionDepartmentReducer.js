import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function productionDepartmentReducer(state = initialState.productionEmployees, action) {
  switch(action.type) {
    case types.LOAD_EMPLOYEES_FOR_PRODUCTION_DEPARTMENT_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.employees)
      ];

    default:
      return state;
  }
}
