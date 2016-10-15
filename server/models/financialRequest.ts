/// <reference path="../../typings/sequelize/sequelize.d.ts" />
import * as Sequelize from "sequelize";

export interface FinancialRequestAttribute {
    id?:string;
    departmentid?:string;
		eventid?:string;
		amount?:string;
		reason?:string;
}

export interface FinancialRequestInstance extends Sequelize.Instance<FinancialRequestAttribute>, FinancialRequestAttribute {
  getFinancialRequest: Sequelize.BelongsToGetAssociationMixin<FinancialRequestInstance>;
  createFinancialRequest: Sequelize.BelongsToCreateAssociationMixin<FinancialRequestInstance>;
}

export interface FinancialRequestModel extends Sequelize.Model<FinancialRequestInstance, FinancialRequestAttribute> { }

export class FinancialRequestTable implements Sequelize.DefineAttributes {
  [name : string] : string;
  id:any;
  departmentid:any;
	eventid:any;
	amount:any;
	reason:any;

  constructor() {
    this.id = {
      "type": Sequelize.INTEGER,
      "allowNull": false,
      "primaryKey": true,
      "autoIncrement": true 
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
    this.eventid = {
      "type": Sequelize.INTEGER,
      "allowNull": false,
			"foreignKey": true,
			"references": {
				"model": "event",
				"key":   "id"
			}
    }
    this.amount = {
      "type": Sequelize.INTEGER,
      "allowNull": false
    }
    this.reason = {
      "type": Sequelize.STRING(128),
      "allowNull": false
    }
  }
}