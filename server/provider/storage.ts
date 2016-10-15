/// <reference path="../../typings/sequelize/sequelize.d.ts" />
import * as Sequelize from "sequelize";
import {DepartmentModel, DepartmentInstance, DepartmentAttribute, DepartmentTable} from "../models/department"
import {EmployeeModel, EmployeeInstance, EmployeeAttribute, EmployeeTable} from "../models/employee"
import {ClientModel, ClientInstance, ClientAttribute, ClientTable} from "../models/client"
import {EventModel, EventInstance, EventAttribute, EventTable} from "../models/event"
import {EventRequestModel, EventRequestInstance, EventRequestAttribute, EventRequestTable} from "../models/eventRequest"
import {FinancialRequestModel, FinancialRequestInstance, FinancialRequestAttribute, FinancialRequestTable} from "../models/financialRequest"
import {RecruitmentRequestModel, RecruitmentRequestInstance, RecruitmentRequestAttribute, RecruitmentRequestTable} from "../models/recruitmentRequest"
import {ApplicationModel, ApplicationInstance, ApplicationAttribute, ApplicationTable} from "../models/application"
import {TaskModel, TaskInstance, TaskAttribute, TaskTable} from "../models/task"


export interface StorageManager {
    init(force?:boolean):any;
    getEmployees():any;
    getEmployeeByUsernameAndPassword(username:string, password:string):any;
    getEventRequests():any;
    createEventRequests(details:any):any;
}

export class SequelizeStorageManager implements StorageManager {
    public sequelize:Sequelize.Sequelize;
    public Department:DepartmentModel;
    public Employee:EmployeeModel;
    public Client:ClientModel;
    public EventRequest:EventRequestModel;
    public Event:EventModel;
    public FinancialRequest:FinancialRequestModel;
    public RecruitmentRequest:RecruitmentRequestModel;
    public Application:ApplicationModel;
    public Task:TaskModel;

    constructor() {

        this.sequelize = new Sequelize('mysql://bd25aad1a27147:3c718b93@eu-cdbr-west-01.cleardb.com/heroku_a97929cf2aedc44?reconnect=true');
        
        this.Department = this.sequelize.define<DepartmentInstance, DepartmentAttribute>("Department", new DepartmentTable(),
            {
                "tableName": "department",
                "timestamps": true,
                "createdAt": "created_at",
                "updatedAt": "updated_at",
            });
        this.Employee = this.sequelize.define<EmployeeInstance, EmployeeAttribute>("Employee", new EmployeeTable(),
            {
                "tableName": "employee",
                "timestamps": true,
                "createdAt": "created_at",
                "updatedAt": "updated_at",
            });
        this.Client = this.sequelize.define<ClientInstance, ClientAttribute>("Client", new ClientTable(),
            {
                "tableName": "client",
                "timestamps": true,
                "createdAt": "created_at",
                "updatedAt": "updated_at",
            });
        this.EventRequest = this.sequelize.define<EventRequestInstance, EventRequestAttribute>("EventRequest", new EventRequestTable(),
            {
                "tableName": "eventrequest",
                "timestamps": true,
                "createdAt": "created_at",
                "updatedAt": "updated_at",
            });
        this.Event = this.sequelize.define<EventInstance, EventAttribute>("Event", new EventTable(),
            {
                "tableName": "event",
                "timestamps": true,
                "createdAt": "created_at",
                "updatedAt": "updated_at",
            });
        this.FinancialRequest = this.sequelize.define<FinancialRequestInstance, FinancialRequestAttribute>("FinancialRequest", new FinancialRequestTable(),
            {
                "tableName": "financialrequest",
                "timestamps": true,
                "createdAt": "created_at",
                "updatedAt": "updated_at",
            });
        this.RecruitmentRequest = this.sequelize.define<RecruitmentRequestInstance, RecruitmentRequestAttribute>("RecruitmentRequest", new RecruitmentRequestTable(),
            {
                "tableName": "recruitmentrequest",
                "timestamps": true,
                "createdAt": "created_at",
                "updatedAt": "updated_at",
            });
        this.Application = this.sequelize.define<ApplicationInstance, ApplicationAttribute>("Application", new ApplicationTable(),
            {
                "tableName": "application",
                "timestamps": true,
                "createdAt": "created_at",
                "updatedAt": "updated_at",
            });
        this.Task = this.sequelize.define<TaskInstance, TaskAttribute>("Task", new TaskTable(),
            {
                "tableName": "task",
                "timestamps": true,
                "createdAt": "created_at",
                "updatedAt": "updated_at",
            });
    }

    init(force?:boolean):Promise<any> {
        force = force || false;
        return this.sequelize.sync({force: force, logging: false});
    }
    
    //------------------------------EMPLOYEE------------------------------
    getEmployees():any{
        return this.Employee.findAll();
    }

    getEmployeeByUsernameAndPassword(username:string, password:string):any {
        return this.Employee.find({where: {username: username, password: password}});
    }

    //------------------------------CLIENT------------------------------
    getClients():any{
        return this.Client.findAll();
    }

    //------------------------------EVENT REQUEST------------------------------
    getEventRequests():any{
        return this.EventRequest.findAll();
    }
    createEventRequests(details:any):any{
        return this.EventRequest.create(details);
    }
}
