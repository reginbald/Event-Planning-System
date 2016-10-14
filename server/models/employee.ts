/// <reference path="../../typings/sequelize/sequelize.d.ts" />
import * as Sequelize from "sequelize";

export interface EmployeeAttribute {
    id?:string;
    username?:string;
    password?:string;
    access?:number;
    name?:string;
    email?:string;
}

export interface EmployeeInstance extends Sequelize.Instance<EmployeeAttribute>, EmployeeAttribute {
  getEmployee: Sequelize.BelongsToGetAssociationMixin<EmployeeInstance>;
  createEmployee: Sequelize.BelongsToCreateAssociationMixin<EmployeeInstance>;
}

export interface EmployeeModel extends Sequelize.Model<EmployeeInstance, EmployeeAttribute> { }

export class EmployeeTable implements Sequelize.DefineAttributes {
  id:any;
  username:any;
  password:any;
  access:any;
  name:any;
  email:any;
  [name : string] : string;
  

  constructor() {
    this.id = {
      "type": Sequelize.UUID,
      "allowNull": false,
      "primaryKey": true
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
  }
}