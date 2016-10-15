import {StorageManager} from '../../provider/storage';
import {MockPromise} from "./mockPromise";

export class MockStorageManager implements StorageManager {
	public EmployeeList: any[];
	public ClientList: any[];
	public EventRequestList: any[];

	constructor() {
		this.EmployeeList = [];
		this.ClientList = [];
		this.EventRequestList = [];
	}

	init(force?:boolean):any{
			return true;
	};

	//------------------------EMPLOYEE------------------------
	getEmployees():any{
		return new MockPromise(this.EmployeeList);
	};

	getEmployeeByUsernameAndPassword(username:any, password:any):any{
			for (let e of this.EmployeeList) {
				if (e.username === username && e.password === password) {
					return new MockPromise(e);
				}
			}
			return new MockPromise(null);
	};

	//------------------------CLIENT------------------------
	getClients():any{
		return new MockPromise(this.ClientList);
	};
	createClient(details:any):any{
		if (details.error) {
			let promise = new MockPromise(details)
			promise.throw = true;
			return promise;
		}
		this.ClientList.push(details);
		return new MockPromise(details);
	}

	//------------------------EVENT REQUEST------------------------
	getEventRequests():any{
		return new MockPromise(this.EventRequestList);
	};

	createEventRequest(details:any):any{
		if (details.error) {
			let promise = new MockPromise(details)
			promise.throw = true;
			return promise;
		}
		this.EventRequestList.push(details);
		return new MockPromise(details);
	}
}
