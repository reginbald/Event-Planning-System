/**
* Mock api fakes fetching clients
*/

// fake client db
const clients = [
  {
    id: '0',
    name: 'Villi',
    email: 'villi@akureyri.is'
  },
  {
    id: '1',
    name: 'Þorsteinn',
    email: 'torsteinn@ls.is'
  },
  {
    id: '2',
    name: 'Fannar',
    email: 'fannar@ls.is'
  }
];

// Simulate server delay
const generateDelay = () => {
  return Math.floor((Math.random()*1000)+400);
};
export default class mockClientApi {
  static getAllClients() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], clients));
      }, generateDelay);
    });
  }
}
