/// <reference path="../../typings/sequelize/sequelize.d.ts" />
import * as Sequelize from "sequelize";

export interface DepartmentAttribute {
    id?:string;
    name?:string;
}

export interface DepartmentInstance extends Sequelize.Instance<DepartmentAttribute>, DepartmentAttribute {
  getDepartment: Sequelize.BelongsToGetAssociationMixin<DepartmentInstance>;
  createDepartment: Sequelize.BelongsToCreateAssociationMixin<DepartmentInstance>;
}

export interface DepartmentModel extends Sequelize.Model<DepartmentInstance, DepartmentAttribute> { }

export class DepartmentTable implements Sequelize.DefineAttributes {
  [name : string] : string;

	id:any;
	name:any;

  constructor() {
    this.id = {
      "type": Sequelize.UUID,
      "allowNull": false,
      "primaryKey": true
    }
		this.name = {
      "type": Sequelize.STRING(128),
      "allowNull": false
    }
  }
}