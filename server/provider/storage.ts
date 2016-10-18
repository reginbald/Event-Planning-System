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

    getEmployees(succ:Function, err:Function):void;
    getEmployeeById(id:number, succ:Function, err:Function):any;
    getEmployeesForDepartmentId(id:any):any;
    createEmployee(details:any):any;
    getEmployeeByUsernameAndPassword(username:string, password:string, succ:Function, err:Function):any;
    

    getClients(succ:Function, err:Function):void;
    createClient(newClient:any, succ:Function, err:Function):void;

    getEventRequests(succ:Function, err:Function):void;
    getEventRequestById(id:number, succ:Function, err:Function):any;
    createEventRequest(details:any):any;
    updateEventRequest(id:number, update:any, succ:Function, err:Function):any;
    updateEventRequestStatus(id:number, status:string, succ:Function, err:Function):any;

    getEvents(succ:Function, err:Function):void;
    createEvent(details:any):any;
    getEventsForClientId(id:number, succ:Function, err:Function):void;
    getAllEventsWithApplicationTasksForDepartment(id:number, succ:Function, err:Function):void;

    getApplications(succ:Function, err:Function):void;
    createApplication(newApp:any, succ:Function, err:Function):void;
    getApplicationForEventAndDepartment(eventId:number, departmentId:number, succ:Function, err:Function):void;

    getTasks(succ:Function, err:Function):void;
    getTasksForEmployeeId(id:any):any;
    createTask(details:any, succ:Function, err:Function):void;
    getTasksForApplication(id:number, succ:Function, err:Function):void;

    getFinancialRequests(succ:Function, err:Function):void;
    createFinancialRequest(details:any):any;
    getRecruitmentRequests(succ:Function, err:Function):void;
    createRecruitmentRequest(details:any):any;

    getJobApplications(succ:Function, err:Function):any;
    createJobApplication(application:any, succ:Function, err:Function):any;
}

class HasManyOptions implements Sequelize.AssociationOptionsHasMany {
    public joinTableName: ''
    constructor(name) {
        this.joinTableName = name;
    }
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
            this.Event.hasMany(this.Application);
            this.Application.hasMany(this.Task);
    }

    init(force?:boolean):Promise<any> {
        force = force || false;
        return this.sequelize.sync({force: force, logging: false});
    }
    
    //------------------------------EMPLOYEE------------------------------
    getEmployees(succ:Function, err:Function):void {
        this.Employee.findAll()
        .then((employees) => {succ(employees)})
        .catch((error) => {err(error)});
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
    getClients(succ:Function, err:Function):void {
        this.Client.findAll()
        .then((clients) => {succ(clients)})
        .catch((error)=>{err(error)});
    }
    createClient(newClient:any, succ:Function, err:Function):void {
        this.Client.create(newClient)
        .then((client) => {succ(client)})
        .catch((error)=>{err(error)});
    }

    //------------------------------EVENT REQUEST------------------------------
    getEventRequests(succ:Function, err:Function):void {
        this.EventRequest.findAll()
        .then((clients) => {succ(clients)})
        .catch((error)=>{err(error)});
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
    getEvents(succ:Function, err:Function):void {
        this.Event.findAll()
        .then((events)=>{succ(events)})
        .catch((error)=>{err(error)});
    }
    createEvent(details:any):any {
        return this.Event.create(details);
    }

    getEventsForClientId(id:number, succ:Function, err:Function):void {
        this.Event.findAll({ where: { "clientid": id } })
        .then((events) => {
            return succ(events);
        })
        .catch((error) => {
            return err(error);
        });
    }

    getAllEventsWithApplicationTasksForDepartment(id:number, succ:Function, err:Function):void {
        this.Event.findAll({ 
            include: [
                {
                    model: this.Application,
                    where: {"departmentid": id},
                    include: [
                        {
                            model: this.Task
                        }
                    ]
                }
            ]
        })
        .then((events)=>{succ(events)})
        .catch((error)=>{err(error)});
    }

    //------------------------------FINANCIAL REQUEST------------------------------
    getFinancialRequests(succ:Function, err:Function):void {
        this.FinancialRequest.findAll()
        .then((requests) => {succ(requests)})
        .catch((error) => {err(error)});
    }
    createFinancialRequest(details:any):any {
        return this.FinancialRequest.create(details);
    }

    //------------------------------RECRUITMENT REQUEST------------------------------
    getRecruitmentRequests(succ:Function, err:Function):void {
        this.RecruitmentRequest.findAll()
        .then((requests) => {succ(requests)})
        .catch((error) => {err(error)});
    }
    createRecruitmentRequest(details:any):any {
        return this.RecruitmentRequest.create(details);
    }

    //------------------------------APPLICATION------------------------------
    getApplications(succ:Function, err:Function):void {
        this.Application.findAll()
        .then((applications)=>{
            succ(applications);
        })
        .catch((error)=>{
            err(error);
        });
    }
    createApplication(newApp:any, succ:Function, err:Function):void {
        this.Application.create(newApp)
        .then((application)=>{
            succ(application);
        })
        .catch((error)=>{
            err(error);
        });
    }
    getApplicationForEventAndDepartment(eventId:number, departmentId:number, succ:Function, err:Function):void {
        this.Application.find({ where: { "eventid": eventId, "departmentid": departmentId } })
        .then((application)=>{
            succ(application);
        })
        .catch((error)=>{
            err(error);
        });
    }

    //------------------------------TASK------------------------------
    getTasks(succ:Function, err:Function):void {
        this.Task.findAll()
        .then((requests) => {succ(requests)})
        .catch((error) => {err(error)});
    }
    getTasksForEmployeeId(id:any):any {
        return this.Task.findAll({ where: { "employeeid": id } });
    }
    createTask(details:any, succ:Function, err:Function):void {
        console.log("CREATE TASK: ", details);
        this.Task.create(details)
        .then((task) => {
            console.log("CREATE TASK SUCC: ", task);
            succ(task);
        })
        .catch((error) => {
            console.log("CREATE TASK ERROR: ", error);
            err(error);
        });
    }
    getTasksForApplication(id:number, succ:Function, err:Function):void {
        this.Task.findAll({ where: { "applicationid": id } })
        .then((tasks) => {
            succ(tasks);
        })
        .catch((error) => {
            err(error);
        });
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
