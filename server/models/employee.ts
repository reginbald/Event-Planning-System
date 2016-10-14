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
