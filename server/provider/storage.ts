/// <reference path="../../typings/sequelize/sequelize.d.ts" />
import * as Sequelize from "sequelize";
import {EmployeeModel, EmployeeInstance, EmployeeAttribute, EmployeeTable} from "../models/employee"

export interface StorageManager {
    init(force?:boolean):Promise<any>;
    getEmployees():Promise<any>;
}

export class SequelizeStorageManager implements StorageManager {
    public sequelize:Sequelize.Sequelize;
    public Employee:EmployeeModel;

    constructor() {

        this.sequelize = new Sequelize('mysql://bd25aad1a27147:3c718b93@eu-cdbr-west-01.cleardb.com/heroku_a97929cf2aedc44?reconnect=true');
        this.Employee = this.sequelize.define<EmployeeInstance, EmployeeAttribute>("Employee", new EmployeeTable(),
            {
                "tableName": "employee",
                "timestamps": true,
                "createdAt": "created_at",
                "updatedAt": "updated_at",
            });
    }

    init(force?:boolean):Promise<any> {
        force = force || false;
        return this.sequelize.sync({force: force, logging: false});
    }

    getEmployees():Promise<any> {
        return this.Employee.findAll();
    }
}
