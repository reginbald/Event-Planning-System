import {StorageManager} from "./storage";

export class AccessProvider {

	private storageManager:StorageManager;

	constructor(storageManager:StorageManager) {
		this.storageManager = storageManager;
	}

	login = (username:string, password:string, succ:Function, err:Function) => {
		this.storageManager.getEmployeeByUsernameAndPassword(username, password, (employee) => {
			if (employee === null) {
				return err("UNAUTHORIZED");
			}
			delete employee.password
			return succ(employee);
		}, (error) => {
			return err(error);
		});
	};

	// Checks if employee has necessary access level
	checkAccess = (employeeId:number, accessLevel:number[], succ:Function, err:Function) => {
		this.storageManager.getEmployeeById(employeeId, (employee) => {
			if (employee !== null) {
				if (accessLevel.indexOf(+employee.access) === -1){
					return err("ERROR_ACCESS_DENIED");
				}
				delete employee.password
				succ(employee);
			} else {
				return err("ERROR_EMPLOYEE_NOT_FOUND");
			}
		}, (error) =>{
			return err("ERROR_DATABASE");
		});
	}
}
