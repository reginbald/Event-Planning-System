/// <reference path="../../typings/sequelize/sequelize.d.ts" />
import * as Sequelize from "sequelize";

export interface JobApplicationAttribute {
    id?:string;
    departmentid?:string;
		recruitment_request_id?:string;
		contract_type?:string;
		years_experience?:string;
		job_title?:string;
		job_description?:string;
}

export interface JobApplicationInstance extends Sequelize.Instance<JobApplicationAttribute>, JobApplicationAttribute {
  getJobApplication: Sequelize.BelongsToGetAssociationMixin<JobApplicationInstance>;
  createJobApplication: Sequelize.BelongsToCreateAssociationMixin<JobApplicationInstance>;
}

export interface JobApplicationModel extends Sequelize.Model<JobApplicationInstance, JobApplicationAttribute> { }

export class JobApplicationTable implements Sequelize.DefineAttributes {
  [name : string] : string;
  id:any;
  departmentid:any;
	recruitment_request_id:any;
	contract_type:any;
	years_experience:any;
	job_title:any;
	job_description:any;

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
		this.recruitment_request_id = {
      "type": Sequelize.INTEGER,
      "allowNull": false,
			"foreignKey": true,
			"references": {
				"model": "recruitmentrequest",
				"key":   "id"
			}
    }
		this.contract_type = {
      "type": Sequelize.STRING(128),
      "allowNull": false
    }
		this.years_experience = {
      "type": Sequelize.INTEGER,
      "allowNull": false
    }
		this.job_title = {
      "type": Sequelize.STRING(128),
      "allowNull": false
    }
		this.job_description = {
      "type": Sequelize.STRING(128),
      "allowNull": false
    }
  }
}