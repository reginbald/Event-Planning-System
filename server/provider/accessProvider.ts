import {StorageManager} from "./storage";

export class AccessProvider {

	private storageManager:StorageManager;

	constructor(storageManager:StorageManager) {
		this.storageManager = storageManager;
	}

	login = (req:any, res:any) => {
		if(!req.body.hasOwnProperty('username')) {
			return res.status(412).send('ERROR_412_USERNAME');
		}
		if(!req.body.hasOwnProperty('password')) {
			return res.status(412).send('ERROR_412_PASSWORD');
		}
		this.storageManager.getEmployeeByUsernameAndPassword(req.body.username, req.body.password)
		.then((results) => {
			if (results === null) {
				res.status(401).send("ERROR_LOGIN");
			} else {
				res.send(results);
			}
		})
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
