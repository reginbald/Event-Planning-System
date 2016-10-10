/// <reference path="../../typings/sequelize/sequelize.d.ts" />
import * as Sequelize from "sequelize";

export interface EmployeeAttribute {
    id?:string;
    name?:string;
    email?:string;
    password?:string;
}

export interface EmployeeInstance extends Sequelize.Instance<EmployeeAttribute>, EmployeeAttribute {
  getEmployee: Sequelize.BelongsToGetAssociationMixin<EmployeeInstance>;
  createEmployee: Sequelize.BelongsToCreateAssociationMixin<EmployeeInstance>;
}

export interface EmployeeModel extends Sequelize.Model<EmployeeInstance, EmployeeAttribute> { }

export interface StorageManager {
    init(force?:boolean):Promise<any>;
    getEmployeeById(id:string):Promise<any>;
}

export class SequelizeStorageManager implements StorageManager {
    public sequelize:Sequelize.Sequelize;
    public Employee:EmployeeModel;

    constructor() {

        this.sequelize = new Sequelize('mysql://bd25aad1a27147:3c718b93@eu-cdbr-west-01.cleardb.com/heroku_a97929cf2aedc44?reconnect=true');
        this.Employee = this.sequelize.define<EmployeeInstance, EmployeeAttribute>("Employee", {
                "id": {
                    "type": Sequelize.UUID,
                    "allowNull": false,
                    "primaryKey": true
                },
                "name": {
                    "type": Sequelize.STRING(128),
                    "allowNull": false
                },
                "email": {
                    "type": Sequelize.STRING(128),
                    "allowNull": false,
                    "unique": true,
                    "validate": {
                        "isEmail": true
                    }
                }
            },
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

    getEmployeeById(id:string):Promise<any> {
        return this.Employee.find({where: {id: id}});
    }
}
