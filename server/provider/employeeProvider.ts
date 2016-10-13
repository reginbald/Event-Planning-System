import * as express from "express";
import {StorageManager} from "./storage";

export class EmployeeProvider {

    private storageManager:StorageManager;

    constructor(storageManager:StorageManager) {
        this.storageManager = storageManager;
    }

    getAllEmployees = (req:express.Request, res:express.Response) => {
      this.storageManager.getEmployees()
        .then((employee:any) => {
            console.log('Employee: ' + employee);
        })
        .catch((err:any) => {
            console.log(err);
        });
    };
}
