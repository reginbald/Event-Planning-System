/// <reference path="../../typings/sequelize/sequelize.d.ts" />
import * as Sequelize from "sequelize";

export interface RecruitmentRequestAttribute {
    id?:string;
    departmentid?:string;
		contract_type?:string;
		years_experience?:string;
		job_title?:string;
		job_description?:string;
}

export interface RecruitmentRequestInstance extends Sequelize.Instance<RecruitmentRequestAttribute>, RecruitmentRequestAttribute {
  getRecruitmentRequest: Sequelize.BelongsToGetAssociationMixin<RecruitmentRequestInstance>;
  createRecruitmentRequest: Sequelize.BelongsToCreateAssociationMixin<RecruitmentRequestInstance>;
  dataValues:any;
}

export interface RecruitmentRequestModel extends Sequelize.Model<RecruitmentRequestInstance, RecruitmentRequestAttribute> { }

export class RecruitmentRequestTable implements Sequelize.DefineAttributes {
  [name : string] : string;
  id:any;
  departmentid:any;
	contract_type:any;
	years_experience:any;
	job_title:any;
	job_description:any;

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