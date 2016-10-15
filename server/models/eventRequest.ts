/// <reference path="../../typings/sequelize/sequelize.d.ts" />
import * as Sequelize from "sequelize";

export interface EventRequestAttribute {
    id?:string;
    name?:string;
		clientid?:string;
		event_type?:string;
		from?:string;
		to?:string;
		attendees?:string;
		decoratons?:string;
		parties?:string;
		photos_filming?:string;
		breakfast_lunch_dinner?:string;
		soft_hot_drinks?:string;
		budget?:string;

		discount?:string;
		financial_feedback?:string;
		status?:string;
}

export interface EventRequestInstance extends Sequelize.Instance<EventRequestAttribute>, EventRequestAttribute {
  getEventRequest: Sequelize.BelongsToGetAssociationMixin<EventRequestInstance>;
  createEventRequest: Sequelize.BelongsToCreateAssociationMixin<EventRequestInstance>;
}

export interface EventRequestModel extends Sequelize.Model<EventRequestInstance, EventRequestAttribute> { }

export class EventRequestTable implements Sequelize.DefineAttributes {
  [name : string] : string;

	id:any;
	name:any;
	clientid:any;
	event_type:any;
	from:any;
	to:any;
	attendees:any;
	decoratons:any;
	parties:any;
	photos_filming:any;
	breakfast_lunch_dinner:any;
	soft_hot_drinks:any;
	budget:any;

	discount:any;
	financial_feedback:any;
	status:any

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
		this.clientid = {
      "type": Sequelize.UUID,
      "allowNull": true,
			"foreignKey": true,
			"references": {
				"model": "client",
				"key":   "id"
			}
    }
		this.event_type = {
      "type": Sequelize.STRING(128),
      "allowNull": false
    }
		this.from = {
      "type": Sequelize.DATE,
      "allowNull": false
    }
		this.to = {
      "type": Sequelize.DATE,
      "allowNull": false
    }
		this.attendees = {
      "type": Sequelize.INTEGER,
      "allowNull": true
    }
		this.decoratons = {
      "type": Sequelize.BOOLEAN,
      "allowNull": true
    }
		this.parties = {
      "type": Sequelize.BOOLEAN,
      "allowNull": true
    }
		this.photos_filming = {
      "type": Sequelize.BOOLEAN,
      "allowNull": true
    }
		this.breakfast_lunch_dinner = {
      "type": Sequelize.BOOLEAN,
      "allowNull": true
    }
		this.soft_hot_drinks = {
      "type": Sequelize.BOOLEAN,
      "allowNull": true
    }
		this.budget = {
      "type": Sequelize.INTEGER,
      "allowNull": false
    }
		this.discount = {
			"type": Sequelize.INTEGER,
      "allowNull": false
		}
		this.financial_feedback = {
			"type": Sequelize.STRING(128),
      "allowNull": false
		}
		this.status = {
			"type": Sequelize.STRING(128),
      "allowNull": false
		}
  }
}