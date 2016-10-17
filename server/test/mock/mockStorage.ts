import {StorageManager} from '../../provider/storage';
import {MockPromise} from "./mockPromise";

export class MockStorageManager implements StorageManager {
	public EmployeeList: any[];
	public ClientList: any[];
	public EventRequestList: any[];
	public EventList: any[];
	public ApplicationList: any[];
	public TaskList: any[];
	public FinancialRequestList: any[];
	public RecruitmentRequestList: any[];
	public dbERROR: boolean;
	public JobApplicationList: any[];

	constructor() {
		this.EmployeeList = [];
		this.ClientList = [];
		this.EventRequestList = [];
		this.EventList = [];
		this.ApplicationList = [];
		this.TaskList = [];
		this.FinancialRequestList = [];
		this.RecruitmentRequestList = [];
		this.dbERROR = false;
		this.JobApplicationList = [];
	}

	init(force?:boolean):any{
			return true;
	};
	//------------------------EMPLOYEE------------------------
	getEmployees():any {
		return new MockPromise(this.EmployeeList);
	};
	getEmployeeById(id:number, succ:Function, err:Function):any {
		if (this.dbERROR) {
			return err("DB_ERROR");
		}
		for (let e of this.EmployeeList) {
			if (e.id === id) {
				return succ(e); 
			}
		}
		succ(null);
	};
	getEmployeesForDepartmentId(id:any):any {
		let list = [];
		for (let e of this.EmployeeList) {
			if (e.departmentid === id) {
				list.push(e); 
			}
		}
		return new MockPromise(list);
	}
	createEmployee(details:any):any {
		if (details.error) {
			let promise = new MockPromise(details)
			promise.throw = true;
			return promise;
		}
		this.EmployeeList.push(details);
		return new MockPromise(details);
	}
	getEmployeeByUsernameAndPassword(username:string, password:string, succ:Function, err:Function):any {
		if (this.dbERROR) {
			return err("DB_ERROR");
		}
		for (let e of this.EmployeeList) {
			if (e.username === username && e.password === password) {
				return succ(e);
			}
		}
		return succ(null);
	};
	//------------------------CLIENT------------------------
	getClients(succ:Function, err:Function):void {
		if (this.dbERROR) {
			return err("DB_ERROR");
		}
		succ(this.ClientList);
	};
	createClient(details:any):any {
		if (details.error) {
			let promise = new MockPromise(details)
			promise.throw = true;
			return promise;
		}
		this.ClientList.push(details);
		return new MockPromise(details);
	}
	//------------------------EVENT REQUEST------------------------
	getEventRequests():any {
		return new MockPromise(this.EventRequestList);
	};
	getEventRequestById(id:any, succ:Function, err:Function):any {
		if (this.dbERROR) {
			return err("DB_ERROR");
		}
		for (let e of this.EventRequestList) {
			if (+e.id === id) {
				return succ(e);
			}
		}
		return succ({});
	};

	createEventRequest(details:any):any {
		if (details.error) {
			let promise = new MockPromise(details)
			promise.throw = true;
			return promise;
		}
		this.EventRequestList.push(details);
		return new MockPromise(details);
	}
	updateEventRequest(id:number, update:any, succ:Function, err:Function):any {
		if (this.dbERROR) {
			return err("DB_ERROR");
		}
		for (let e of this.EventRequestList) {
			if (+e.id === +id) {
				for (var property in update) {
					if (update.hasOwnProperty(property)) {
						e[property] = update[property];
					}
				}
				return succ([1]);
			}
		}
		return succ([0]);
	}
	updateEventRequestStatus(id:number, status:string, succ:Function, err:Function):any {
		if (this.dbERROR) {
			return err("DB_ERROR");
		}
		for (let e of this.EventRequestList) {
			if (+e.id === id) {
				e.status = status;
				return succ([1]);
			}
		}
		return succ([0]);
	}

	//------------------------EVENT------------------------
	getEvents() {
		return new MockPromise(this.EventList);
	}
	createEvent(details:any) {
		if (details.error) {
			let promise = new MockPromise(details)
			promise.throw = true;
			return promise;
		}
		this.EventList.push(details);
		return new MockPromise(details);
	}
	getEventsForClientId(id:number, succ:Function, err:Function):void {
		console.log("iD ", id);
		if (this.dbERROR) {
			return err("DB_ERROR");
		}
		let list = [];
		for (let e of this.EventList) {
			if (+e.clientid === +id) {
				list.push(e); 
			}
		}
		return succ(list);
	}

	//------------------------FINANCIAL REQUEST------------------------
	getFinancialRequests():any {
		return new MockPromise(this.FinancialRequestList);
	};
	createFinancialRequest(details:any):any {
		if (details.error) {
			let promise = new MockPromise(details)
			promise.throw = true;
			return promise;
		}
		this.FinancialRequestList.push(details);
		return new MockPromise(details);
	}
	//------------------------RECRUITMENT REQUEST------------------------
	getRecruitmentRequests():any {
		return new MockPromise(this.RecruitmentRequestList);
	};
	createRecruitmentRequest(details:any):any {
		if (details.error) {
			let promise = new MockPromise(details)
			promise.throw = true;
			return promise;
		}
		this.RecruitmentRequestList.push(details);
		return new MockPromise(details);
	}
	//------------------------APPLICATION------------------------
	getApplications(succ:Function, err:Function):void {
		if (this.dbERROR) {
			return err("DB_ERROR");
		}
		succ(this.ApplicationList);
	}
	createApplication(newApp:any, succ:Function, err:Function):void {
		if (this.dbERROR) {
			return err("DB_ERROR");
		}
		this.ApplicationList.push(newApp);
		succ(newApp);
	}
	//------------------------Task------------------------
	getTasks():any {
		return new MockPromise(this.TaskList);
	}
	getTasksForEmployeeId(id:any):any {
		let list = [];
		for (let e of this.TaskList) {
			if (e.employeeid === id) {
				list.push(e); 
			}
		}
		return new MockPromise(list);
	}
	createTask(details:any):any {
		if (details.error) {
			let promise = new MockPromise(details)
			promise.throw = true;
			return promise;
		}
		this.TaskList.push(details);
		return new MockPromise(details);
	}
	//------------------------------JOB APPLICATION------------------------------
	getJobApplications(succ:Function, err:Function):any {
		if (this.dbERROR) {
			return err("DB_ERROR");
		}
		return succ(this.JobApplicationList);
	}
	createJobApplication(application:any, succ:Function, err:Function):any {
		if (this.dbERROR) {
			return err("DB_ERROR");
		}
		this.TaskList.push(application);
		return succ(application);
	}
}
