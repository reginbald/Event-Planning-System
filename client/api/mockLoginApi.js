/**
* Mock api fakes login for users for sake of development
*/

// fake user db
const users = [
  {
    id: '1',
    username: 'vlad',
    password: 'vlad'
  },
  {
    id: '2',
    username: 'misha',
    password: 'misha'
  },
  {
    id: '3',
    username: 'montelius',
    password: 'montelius'
  }
];

// Simulate server delay from 1 - 3 sec.
const generateDelay = () => {
  return Math.floor((Math.random()*3000)+1000);
};

// Expose the loginUser method, try to find a match and compare passw
export default class mockLoginApi {
  static loginUser(user) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const userMatch = users.filter(x => x.username === user.username);
        if(userMatch[0] === undefined){
          reject('user error');
        }
        else if(userMatch[0].password !== user.password || user.password.length < 3) {
          reject('invald password or password too short');
        }
        else {
          resolve(Object.assign([], userMatch));
        }
      }, generateDelay());
    });
  }
}

//export default mockLoginApi;
