import {StorageManager} from "./storage";

export class EmployeeProvider {

    private storageManager:StorageManager;

    constructor(storageManager:StorageManager) {
        this.storageManager = storageManager;
    }

    getAllEmployees = (req:any, res:any) => {
      this.storageManager.getEmployees()
        .then((employees:any) => {
            res.send(employees.dataValues);
        })
        .catch((err:any) => {
            res.status(500).send(err.message);
        });
    };
}
