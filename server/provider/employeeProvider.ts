import {StorageManager} from "./storage";

export class EmployeeProvider {

    private storageManager:StorageManager;

    constructor(storageManager:StorageManager) {
        this.storageManager = storageManager;
    }

    getAllEmployees = (req:any, res:any) => {
      this.storageManager.getEmployees()
        .then((employees:any) => {
            res.send(employees);
        })
        .catch((err:any) => {
            res.status(500).send(err.message);
        });
    };
    createEmployee = (req:any, res:any) => {
		this.storageManager.createEmployee(req.body)
		.then((results) => {
			res.send(results);
		}).catch((err) => {
			res.status(500).send(err.message);
		});
	};
}
