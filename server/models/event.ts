/// <reference path="../../typings/sequelize/sequelize.d.ts" />
import * as Sequelize from "sequelize";

export interface EventAttribute {
    id?:string;
    name?:string;
		clientid?:string;
		eventrequestid?:string;
		event_type?:string;
		description?:string;

		attendees?:string
		budget?:string;
		from?:string;
		to?:string;

		decorations?:string;
		food_drinks?:string;
		filming_photos?:string;
		music?:string;
		posters_art?:string;
		computer_issues?:string;
		other_needs?:string;
}

export interface EventInstance extends Sequelize.Instance<EventAttribute>, EventAttribute {
  getEvent: Sequelize.BelongsToGetAssociationMixin<EventInstance>;
  createEvent: Sequelize.BelongsToCreateAssociationMixin<EventInstance>;
}

export interface EventModel extends Sequelize.Model<EventInstance, EventAttribute> { }

export class EventTable implements Sequelize.DefineAttributes {
	[name : string] : string;
  id:any;
  name:any;
	clientid:any;
	eventrequestid:any;
	event_type:any;
	description:any;

	attendees:any
	budget:any;
	from:any;
	to:any;

	decorations:any;
	food_drinks:any;
	filming_photos:any;
	music:any;
	posters_art:any;
	computer_issues:any;
	other_needs:any;

  

  constructor() {
    this.id = {
      "type": Sequelize.INTEGER,
      "allowNull": false,
      "primaryKey": true,
      "autoIncrement": true 
    }
    this.name = {
      "type": Sequelize.STRING(128),
      "allowNull": false
    }
		this.clientid = {
      "type": Sequelize.INTEGER,
      "allowNull": false,
			"foreignKey": true,
			"references": {
				"model": "client",
				"key":   "id"
			}
    }
		this.eventrequestid = {
			"type": Sequelize.INTEGER,
      "allowNull": true,
			"foreignKey": true,
			"references": {
				"model": "eventrequest",
				"key":   "id"
			}
		}
		this.event_type = {
      "type": Sequelize.STRING(128),
      "allowNull": false
    }
		this.description = {
      "type": Sequelize.STRING(128),
      "allowNull": false
    }
		this.attendees = {
      "type": Sequelize.INTEGER,
      "allowNull": true
    }
		this.budget = {
      "type": Sequelize.INTEGER,
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
		this.decorations = {
      "type": Sequelize.STRING(128),
      "allowNull": false
    }
		this.food_drinks = {
      "type": Sequelize.STRING(128),
      "allowNull": false
    }
		this.filming_photos = {
      "type": Sequelize.STRING(128),
      "allowNull": false
    }
		this.music = {
      "type": Sequelize.STRING(128),
      "allowNull": false
    }
		this.posters_art = {
      "type": Sequelize.STRING(128),
      "allowNull": false
    }
		this.computer_issues = {
      "type": Sequelize.STRING(128),
      "allowNull": false
    }
		this.other_needs = {
      "type": Sequelize.STRING(128),
      "allowNull": false
    }
  }
}