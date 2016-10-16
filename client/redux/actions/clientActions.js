import mockClientApi from '../../api/mockClientApi';
import request from 'superagent';
import API_PATH from './apiConfig';
import * as types from './actionTypes';

export function getAllClientsSuccess(clients) {
  return {type: types.LOAD_CLIENTS_SUCCESS, clients };
}
export function getAllClients() {
  return dispatch => {
    return request
    .get(API_PATH +'client')
    .set('Accept', 'application/json')
    .then(clients => {
      if(clients) {
        console.log("all clients: ", clients.body);
        dispatch(getAllClientsSuccess(clients.body));
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
/*export function getAllClients() {
  return dispatch => {
    return mockClientApi.getAllClients().then(clients => {
      if(clients) {
        dispatch(getAllClientsSuccess(clients));
      }
      else{

      // Do something here if we have time

      }
    }).catch(error => {
      throw(error);
    });
  };
}*/

export function addNewClientSuccess(client) {
  return {type: types.ADD_NEW_CLIENT_SUCCESS, client };
}
export function addNewClient(newClient) {
  return dispatch => {
    return request
    .post(API_PATH + 'client')
    .send(newClient)
    .set('Accept', 'application/json')
    .then(client => {
      if(client) {
        dispatch(addNewClientSuccess(client));
      }
      else{

      // Do something here if we have time

      }
    }).catch(error => {
      throw(error);
    });
  };
}

/*export function addNewClient(newClient) {
  return dispatch => {
    return mockClientApi.addNewClient(newClient).then(client => {
      if(client) {
        dispatch(addNewClientSuccess(client));
      }
      else{

      // Do something here if we have time

      }
    }).catch(error => {
      throw(error);
    });
  };
}*/
