import {StorageManager} from "./storage";
import {AccessProvider} from "./accessProvider";
import {EmployeeProvider} from "./employeeProvider";
import {ClientProvider} from "./clientProvider";
import {EventRequestProvider} from "./eventRequestProvider";
import {EventProvider} from "./eventProvider";
import {ApplicationProvider} from "./applicationProvider"
import {TaskProvider} from "./taskProvider"
import {FinancialRequestProvider} from "./financialRequestProvider"
import {RecruitmentRequestProvider} from "./recruitmentRequestProvider"

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
	}

	//------------------------------/api/login------------------------------
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
	//------------------------------/api/request/event/------------------------------
	
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
}