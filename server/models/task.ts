/// <reference path="../../typings/sequelize/sequelize.d.ts" />
import * as Sequelize from "sequelize";

export interface TaskAttribute {
    id?:string;
		employeeid?:string;
		type?:string;
		description?:string;
		priority?:string;
		senderid?:string;
}

export interface TaskInstance extends Sequelize.Instance<TaskAttribute>, TaskAttribute {
  getTask: Sequelize.BelongsToGetAssociationMixin<TaskInstance>;
  createTask: Sequelize.BelongsToCreateAssociationMixin<TaskInstance>;
}

export interface TaskModel extends Sequelize.Model<TaskInstance, TaskAttribute> { }

export class TaskTable implements Sequelize.DefineAttributes {
  [name : string] : string;
  id:any;
	employeeid:any;
	senderid:any;
	type:any;
	description:any;
	priority:any;

  constructor() {
    this.id = {
      "type": Sequelize.INTEGER,
      "allowNull": false,
      "primaryKey": true,
      "autoIncrement": true
    }
		this.employeeid = {
      "type": Sequelize.INTEGER,
      "allowNull": false,
			"foreignKey": true,
			"references": {
				"model": "employee",
				"key":   "id"
			}
    }
		this.senderid = {
      "type": Sequelize.INTEGER,
      "allowNull": false,
			"foreignKey": true,
			"references": {
				"model": "employee",
				"key":   "id"
			}
    }
		this.type = {
			"type": Sequelize.STRING(128),
      "allowNull": false
		}
		this.description = {
      "type": Sequelize.STRING(128),
      "allowNull": false
    }
		this.priority = {
      "type": Sequelize.STRING(128),
      "allowNull": false
    }
  }
}
