import mockClientApi from '../../api/mockClientApi';
import * as types from './actionTypes';

export function getAllClientsSuccess(clients) {
  return {type: types.LOAD_CLIENTS_SUCCESS, clients };
}

export function getAllClients() {
  return dispatch => {
    return mockClientApi.getAllClients().then(clients => {
      if(clients) {
        console.log("clients ", clients);
        dispatch(getAllClientsSuccess(clients));
      }
      else{
      /*
      * Do something here if we have time
      */
      }
    }).catch(error => {
      throw(error);
    });
  };
}

export function addNewClientSuccess(client) {
  return {type: types.ADD_NEW_CLIENT_SUCCESS, client };
}

export function addNewClient(newClient) {
  return dispatch => {
    return mockClientApi.addNewClient(newClient).then(client => {
      if(client) {
        dispatch(addNewClientSuccess(client));
      }
      else{
      /*
      * Do something here if we have time
      */
      }
    }).catch(error => {
      throw(error);
    });
  };
}
