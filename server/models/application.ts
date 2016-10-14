/// <reference path="../../typings/sequelize/sequelize.d.ts" />
import * as Sequelize from "sequelize";

export interface ApplicationAttribute {
    id?:string;
    departmentid?:string;
		eventid?:string;
}

export interface ApplicationInstance extends Sequelize.Instance<ApplicationAttribute>, ApplicationAttribute {
  getApplication: Sequelize.BelongsToGetAssociationMixin<ApplicationInstance>;
  createApplication: Sequelize.BelongsToCreateAssociationMixin<ApplicationInstance>;
}

export interface ApplicationModel extends Sequelize.Model<ApplicationInstance, ApplicationAttribute> { }

export class ApplicationTable implements Sequelize.DefineAttributes {
  [name : string] : string;
  id:any;
  departmentid:any;
	eventid:any;

  constructor() {
    this.id = {
      "type": Sequelize.UUID,
      "allowNull": false,
      "primaryKey": true
    }
		this.departmentid = {
      "type": Sequelize.UUID,
      "allowNull": false,
			"foreignKey": true,
			"references": {
				"model": "department",
				"key":   "id"
			}
    }
		this.eventid = {
      "type": Sequelize.UUID,
      "allowNull": false,
			"foreignKey": true,
			"references": {
				"model": "event",
				"key":   "id"
			}
    }
  }
}