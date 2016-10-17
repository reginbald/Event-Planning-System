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
import {JobApplicationModel, JobApplicationInstance, JobApplicationAttribute, JobApplicationTable} from "../models/jobApplication"

export interface StorageManager {
    init(force?:boolean):any;

    getEmployees():any;
    getEmployeeById(id:number, succ:Function, err:Function):any;
    getEmployeesForDepartmentId(id:any):any;
    createEmployee(details:any):any;
    getEmployeeByUsernameAndPassword(username:string, password:string, succ:Function, err:Function):any;
    

    getClients():any;
    createClient(details:any):any;

    getEventRequests():any;
    getEventRequestById(id:number, succ:Function, err:Function):any;
    createEventRequest(details:any):any;
    updateEventRequest(id:number, update:any, succ:Function, err:Function):any;
    updateEventRequestStatus(id:number, status:string, succ:Function, err:Function):any;

    getEvents():any;
    createEvent(details:any):any;

    getApplications():any;
    createApplication(details:any):any;

    getTasks():any;
    getTasksForEmployeeId(id:any):any;
    createTask(details:any):any;

    getFinancialRequests():any;
    createFinancialRequest(details:any):any;
    getRecruitmentRequests():any;
    createRecruitmentRequest(details:any):any;

    getJobApplications(succ:Function, err:Function):any;
    createJobApplication(application:any, succ:Function, err:Function):any;
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
    public JobApplication:JobApplicationModel;

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
        this.JobApplication = this.sequelize.define<JobApplicationInstance, JobApplicationAttribute>("JobApplication", new JobApplicationTable(),
            {
                "tableName": "jobapplication",
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
    getEmployees():any {
        return this.Employee.findAll();
    }
    getEmployeeById(id:number, succ:Function, err:Function):any {
        this.Employee.find({where: {id: id}})
        .then((employee) => {
            return succ(employee);
        }).catch((error) => {
            return err(error.message);
        });
    }
    getEmployeesForDepartmentId(id:any):any {
        return this.Employee.findAll({where: {departmentid: id}});
    }
    createEmployee(details:any):any{
        return this.Employee.create(details);
    }
    getEmployeeByUsernameAndPassword(username:string, password:string, succ:Function, err:Function):any {
        this.Employee.find({where: {username: username, password: password}})
        .then((employee) => {
            return succ(employee);
        }).catch((error) => {
            return err(error.message);
        });
    }

    //------------------------------CLIENT------------------------------
    getClients():any {
        return this.Client.findAll();
    }
    createClient(details:any):any {
        return this.Client.create(details);
    }

    //------------------------------EVENT REQUEST------------------------------
    getEventRequests():any {
        return this.EventRequest.findAll();
    }
    getEventRequestById(id:number, succ:Function, err:Function):any {
        this.EventRequest.find({ where: { "id": id } })
        .then((eventrequest) => {
            return succ(eventrequest);
        })
        .catch((error) => {
            return err(error);
        });
    }
    createEventRequest(details:any):any {
        return this.EventRequest.create(details);
    }
    updateEventRequest(id:number, update:any, succ:Function, err:Function):any {
        this.EventRequest.update(update, { where: { "id": id } })
        .then((eventRequest) => {
            return succ(eventRequest);
        })
        .catch((error) => {
            return err(error.message);
        });
    }
    updateEventRequestStatus(id:number, status:string, succ:Function, err:Function):any {
        this.EventRequest.update({status: status}, { where: { "id": id } })
        .then((eventRequest) => {
            return succ(eventRequest);
        }).catch((error) => {
            return err(error.message);
        });
    }

    //------------------------------EVENT------------------------------
    getEvents():any {
        return this.Event.findAll();
    }
    createEvent(details:any):any {
        return this.Event.create(details);
    }

    //------------------------------FINANCIAL REQUEST------------------------------
    getFinancialRequests():any {
        return this.FinancialRequest.findAll();
    }
    createFinancialRequest(details:any):any {
        return this.FinancialRequest.create(details);
    }

    //------------------------------RECRUITMENT REQUEST------------------------------
    getRecruitmentRequests():any {
        return this.RecruitmentRequest.findAll();
    }
    createRecruitmentRequest(details:any):any {
        return this.RecruitmentRequest.create(details);
    }

    //------------------------------APPLICATION------------------------------
    getApplications():any {
        return this.Application.findAll();
    }
    createApplication(details:any):any {
        return this.Application.create(details);
    }

    //------------------------------TASK------------------------------
    getTasks():any {
        return this.Task.findAll();
    }
    getTasksForEmployeeId(id:any):any {
        return this.Task.findAll({ where: { "employeeid": id } });
    }
    createTask(details:any):any {
        return this.Task.create(details);
    }
    //------------------------------JOB APPLICATION------------------------------
    getJobApplications(succ:Function, err:Function):any {
        this.JobApplication.findAll().then((applications) => {
            return succ(applications);
        }).catch((error) => {
            return err(error.message);
        });
    }
    createJobApplication(application:any, succ:Function, err:Function):any {
         this.JobApplication.create(application).then((application) => {
            return succ(application);
        }).catch((error) => {
            return err(error.message);
        });
    }
}
