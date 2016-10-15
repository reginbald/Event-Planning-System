/// <reference path="../../typings/sequelize/sequelize.d.ts" />
import * as Sequelize from "sequelize";

export interface ClientAttribute {
    id?:string;
    name?:string;
    email?:string;
}

export interface ClientInstance extends Sequelize.Instance<ClientAttribute>, ClientAttribute {
  getClient: Sequelize.BelongsToGetAssociationMixin<ClientInstance>;
  createClient: Sequelize.BelongsToCreateAssociationMixin<ClientInstance>;
}

export interface ClientModel extends Sequelize.Model<ClientInstance, ClientAttribute> { }

export class ClientTable implements Sequelize.DefineAttributes {
  id:any;
  name:any;
  email:any;
	eventid:any;
  [name : string] : string;

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