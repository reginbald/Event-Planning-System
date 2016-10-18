import {StorageManager} from "./storage";
import {AccessProvider} from "./accessProvider";
import {EmployeeProvider} from "./employeeProvider";
import {ClientProvider} from "./clientProvider";
import {EventRequestProvider} from "./eventRequestProvider";
import {EventProvider} from "./eventProvider";
import {ApplicationProvider} from "./applicationProvider";
import {TaskProvider} from "./taskProvider";
import {FinancialRequestProvider} from "./financialRequestProvider";
import {RecruitmentRequestProvider} from "./recruitmentRequestProvider";
import {JobApplicationProvider} from "./jobApplicationProvider";

import {NewJobApplicationViewModel} from"../viewModels/newJobApplicationViewModel";
import {NewApplicationViewModel} from"../viewModels/newApplicationViewModel";
import {NewClientViewModel} from"../viewModels/newClientViewModel";

export class RouteProvider {

	private storageManager:StorageManager;
	private accessProvider:AccessProvider;
	private employeeProvider:EmployeeProvider;
	private clientProvider:ClientProvider;
	private eventRequestProvider:EventRequestProvider;
	private eventProvider:EventProvider;
	private applicationProvider:ApplicationProvider;
	private taskProvider:TaskProvider;
	private financialRequestProvider:FinancialRequestProvider;
	private recruitmentRequestProvider:RecruitmentRequestProvider;
	private jobApplicationProvider:JobApplicationProvider;

	constructor(storageManager:StorageManager) {
		this.storageManager = storageManager;
		this.accessProvider = new AccessProvider(storageManager);
		this.employeeProvider = new EmployeeProvider(storageManager);
		this.clientProvider = new ClientProvider(storageManager);
		this.eventRequestProvider = new EventRequestProvider(storageManager);
		this.eventProvider = new EventProvider(storageManager);
		this.applicationProvider = new ApplicationProvider(storageManager);
		this.taskProvider = new TaskProvider(storageManager);
		this.financialRequestProvider = new FinancialRequestProvider(storageManager);
		this.recruitmentRequestProvider = new RecruitmentRequestProvider(storageManager);
		this.jobApplicationProvider = new JobApplicationProvider(storageManager);
	}

	//------------------------------/api/login------------------------------

	//POST: /api/login
	login = (req:any, res:any) => {
		if(!req.body.hasOwnProperty('username')) {
			return res.status(412).send('ERROR_412_USERNAME');
		}
		if(!req.body.hasOwnProperty('password')) {
			return res.status(412).send('ERROR_412_PASSWORD');
		}
		this.accessProvider.login(req.body.username, req.body.password, (employee) => {
			return res.send(employee);
		}, (error) => {
				if (error === "UNAUTHORIZED") {
					return res.status(401).send("ERROR_401_UNAUTHORIZED");
				}
				return res.status(500).send("ERROR_500_DATABASE");
		});
	};

	//------------------------------/api/client/------------------------------
	//GET: /api/client
	getAllClients = (req:any, res:any) => {
		this.clientProvider.getAllClients((clients) => {
			return res.send(clients);
		}, (error) => {
				return res.status(500).send("ERROR_500_DATABASE");
		});
	}

	//POST: /api/client
	postClient = (req:any, res:any) => {
		if(!req.body.hasOwnProperty('name')) {
			return res.status(412).send('ERROR_412_NAME');
		}
		if(!req.body.hasOwnProperty('email')) {
			return res.status(412).send('ERROR_412_EMAIL');
		}
		let newClient = new NewClientViewModel(req.body.name, req.body.email);
		this.clientProvider.createClient(newClient, (client) => {
			return res.send(client);
		}, (error) => {
				return res.status(500).send("ERROR_500_DATABASE");
		});
	}

	//GET: /api/client/:id/event
	getAllEventsForClientId = (req:any, res:any) => {
		this.eventProvider.getAllEventsForClientId(+req.params.id, (events) => {
			return res.send(events);
		}, (error) => {
				return res.status(500).send("ERROR_500_DATABASE");
		});
	}

	//------------------------------/api/client/------------------------------

	//GET: /api/employee
	getAllEmployees = (req:any, res:any) => {
		this.employeeProvider.getAllEmployees((employees) => {
			return res.send(employees);
		}, (error) => {
				return res.status(500).send("ERROR_500_DATABASE");
		});
	}

	//------------------------------/api/request/event/------------------------------
	//GET: /api/request/event
	getAllEventRequests = (req:any, res:any) => {
		this.eventRequestProvider.getAllEventRequests((requests) => {
			return res.send(requests);
		}, (error) => {
				return res.status(500).send("ERROR_500_DATABASE");
		});
	}

	//PUT: /api/request/event/:id
	putEventRequest = (req:any, res:any) => {
		if(req.body === undefined || Object.keys(req.body).length === 0 && req.body.constructor === Object) {
			return res.status(412).send('ERROR_412_MISSING_PROPERTIES');
		}
		this.eventRequestProvider.updateEventRequest(+req.params.id, req.body, (eventrequest) => {
			return res.send(eventrequest);
		}, (error) => {
				return res.status(500).send("ERROR_500_DATABASE");
		});
	}

	//PUT: /api/request/event/:id/status
	putEventRequestStatus = (req:any, res:any) => {
		if(!req.body.hasOwnProperty('status')) {
			return res.status(412).send('ERROR_412_STATUS');
		}
		this.eventRequestProvider.updateEventRequestStatus(+req.params.id, req.body.status, (eventrequest) => {
			return res.send(eventrequest);
		}, (error) => {
				return res.status(500).send("ERROR_500_DATABASE");
		});
	}

	//------------------------------/api/request/financial/------------------------------
	//GET: /api/request/financial
	getAllFinancialRequests = (req:any, res:any) => {
		this.financialRequestProvider.getAllFinancialRequests((requests) => {
			return res.send(requests);
		}, (error) => {
				return res.status(500).send("ERROR_500_DATABASE");
		});
	}

	//------------------------------/api/request/recruitment/------------------------------
	//GET: /api/request/recruitment
	getAllRecruitmentRequests = (req:any, res:any) => {
		this.recruitmentRequestProvider.getAllRecruitmentRequests((requests) => {
			return res.send(requests);
		}, (error) => {
				return res.status(500).send("ERROR_500_DATABASE");
		});
	}

	//------------------------------/api/application/------------------------------

	//GET: /api/application
	getAllApplications = (req:any, res:any) => {
		this.applicationProvider.getAllApplications((applications) => {
			return res.send(applications);
		}, (error) => {
				return res.status(500).send("ERROR_500_DATABASE");
		});
	}

	//POST: /api/application
	postApplication = (req:any, res:any) => {
		if(!req.body.hasOwnProperty('departmentid')) {
			return res.status(412).send('ERROR_412_DEPARTMENTID');
		}
		if(!req.body.hasOwnProperty('eventid')) {
			return res.status(412).send('ERROR_412_EVENTID');
		}
		let application = new NewApplicationViewModel(+req.body.departmentid, +req.body.eventid);
		this.applicationProvider.createApplication(application, (applications) => {
			return res.send(applications);
		}, (error) => {
				return res.status(500).send("ERROR_500_DATABASE");
		});
	}

	//------------------------------/api/jobapplication/------------------------------

	//GET: /api/jobapplication
	getAllJobApplications = (req:any, res:any) => {
		this.jobApplicationProvider.getAllJobApplications((applications) => {
			return res.send(applications);
		}, (error) => {
				return res.status(500).send("ERROR_500_DATABASE");
		});
	}

	//POST: /api/jobapplication
	postJobApplication = (req:any, res:any) => {
		if(!req.body.hasOwnProperty('departmentid')) {
			return res.status(412).send('ERROR_412_DEPARTMENTID');
		}
		if(!req.body.hasOwnProperty('recruitment_request_id')) {
			return res.status(412).send('ERROR_412_RECRUITMENT_REQUEST_ID');
		}
		if(!req.body.hasOwnProperty('contract_type')) {
			return res.status(412).send('ERROR_412_CONTRACT_TYPE');
		}
		if(!req.body.hasOwnProperty('years_experience')) {
			return res.status(412).send('ERROR_412_YEARS_EXPERIENCE');
		}
		if(!req.body.hasOwnProperty('job_title')) {
			return res.status(412).send('ERROR_412_JOB_TITLE');
		}
		if(!req.body.hasOwnProperty('job_description')) {
			return res.status(412).send('ERROR_412_JOB_DESCRIPTION');
		}
		let newJobApp = new NewJobApplicationViewModel(
			req.body.departmentid,
			req.body.recruitment_request_id,
			req.body.contract_type,
			req.body.years_experience,
			req.body.job_title,
			req.body.job_description
		);
		this.jobApplicationProvider.createJobApplication(newJobApp, (application) => {
			return res.send(application);
		}, (error) => {
				return res.status(500).send("ERROR_500_DATABASE");
		});
	}

	//------------------------------/api/event/------------------------------
	//GET: /api/event
	getAllEvents = (req:any, res:any) => {
		this.eventProvider.getAllEvents((events) => {
			return res.send(events);
		}, (error) => {
				return res.status(500).send("ERROR_500_DATABASE");
		});
	}

	//GET: /api/event/:eid/department/:did/tasks
	getAllTasksForEventAndDepartment = (req:any, res:any) => {
		this.taskProvider.getAllTasksForEventAndDepartment(+req.params.eid, +req.params.did, (tasks) => {
			return res.send(tasks);
		}, (error) => {
				if (error === "NOT_FOUND"){
					return res.status(404).send("ERROR_404_NOT_FOUND");
				}
				return res.status(500).send("ERROR_500_DATABASE");
		});
	}

	//------------------------------/api/task/------------------------------
	//GET: /api/task
	getAllTasks = (req:any, res:any) => {
		this.taskProvider.getAllTasks((tasks) => {
			return res.send(tasks);
		}, (error) => {
				return res.status(500).send("ERROR_500_DATABASE");
		});
	}
}
