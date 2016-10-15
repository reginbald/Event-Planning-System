import MockClientApi from '../../api/MockClientApi';
import * as types from './actionTypes';

export function getAllClientsSuccess(clients) {
  console.log('dispatching');
  return {type: types.LOAD_CLIENTS_SUCCESS, clients };
}

export function getAllClients() {
  return dispatch => {
    return MockClientApi.getAllClients().then(clients => {
      if(clients) {
        console.log("clients ", clients);
        dispatch(getAllClientsSuccess(clients));
      }
      else{
      /*
      * Do something here if we have time
      */
         console.log("getAllclients error");
      }
    }).catch(error => {
      throw(error);
    });
  };
}
