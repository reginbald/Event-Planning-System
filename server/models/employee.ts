/// <reference path="../../typings/sequelize/sequelize.d.ts" />
import * as Sequelize from "sequelize";

export interface EmployeeAttribute {
    id?:string;
    username?:string;
    password?:string;
    access?:string;
    name?:string;
    email?:string;
    departmentid?:string;
    job_title?:string;
}

export interface EmployeeInstance extends Sequelize.Instance<EmployeeAttribute>, EmployeeAttribute {
  getEmployee: Sequelize.BelongsToGetAssociationMixin<EmployeeInstance>;
  createEmployee: Sequelize.BelongsToCreateAssociationMixin<EmployeeInstance>;
}

export interface EmployeeModel extends Sequelize.Model<EmployeeInstance, EmployeeAttribute> { }

export class EmployeeTable implements Sequelize.DefineAttributes {
  [name : string] : string;
  id:any;
  username:any;
  password:any;
  access:any;
  name:any;
  email:any;
  departmentid:any;
  job_title:any;

  constructor() {
    this.id = {
      "type": Sequelize.INTEGER,
      "allowNull": false,
      "primaryKey": true,
      "autoIncrement": true 
    }
    this.username = {
      "type": Sequelize.STRING(128),
      "allowNull": false
    }
    this.password = {
      "type": Sequelize.STRING(128),
      "allowNull": false
    }
    this.access = {
      "type": Sequelize.INTEGER,
      "allowNull": false
    }
    this.name = {
      "type": Sequelize.STRING(128),
      "allowNull": false
    }
    this.email = {
      "type": Sequelize.STRING(128),
      "allowNull": false,
      "unique": true,
      "validate": {
        "isEmail": true
      }
    }
    this.departmentid = {
      "type": Sequelize.INTEGER,
      "allowNull": false,
			"foreignKey": true,
			"references": {
				"model": "department",
				"key":   "id"
			}
    }
    this.job_title = {
      "type": Sequelize.STRING(128),
      "allowNull": true
    }
  }
}