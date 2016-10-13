import {StorageManager} from '../../provider/storage';

export class MockStorageManager implements StorageManager {
  public EmployeeList: any[];

  constructor() {
    this.EmployeeList = ["1"];
  }

  init(force?:boolean):Promise<any> {return new Promise<any>((resolve, reject) => {
      resolve(true);
    });
  };

  getEmployees():Promise<any>{return new Promise<any[]>((resolve, reject) => {
      resolve(this.EmployeeList);
    });
  };
}
