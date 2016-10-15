import {StorageManager} from '../../provider/storage';
import {MockPromise} from "./mockPromise";

export class MockStorageManager implements StorageManager {
  public EmployeeList: any[];

  constructor() {
    this.EmployeeList = [];
  }

  init(force?:boolean):any{
      return true;
  };

  getEmployees():any{
    return new MockPromise({"dataValues": this.EmployeeList});
  };
  
  getEmployeeByUsernameAndPassword(username:any, password:any):any{
      for (let e of this.EmployeeList) {
        if (e.username === username && e.password === password) {
          return new MockPromise({"dataValues": e});
        }
      }
      return new MockPromise(null);
  };
}
