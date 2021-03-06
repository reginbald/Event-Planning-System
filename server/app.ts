/// <reference path="../typings/express/express.d.ts" />
/// <reference path="../typings/body-parser/body-parser.d.ts" />

import * as express from "express";
import * as bodyParser from "body-parser";
import {StorageManager, SequelizeStorageManager} from "./provider/storage";
import {RouteProvider} from "./provider/routeProvider";
import {EmployeeProvider} from "./provider/employeeProvider";
import {ClientProvider} from "./provider/clientProvider";
import {EventRequestProvider} from "./provider/eventRequestProvider";
import {EventProvider} from "./provider/eventProvider";
import {ApplicationProvider} from "./provider/applicationProvider"
import {TaskProvider} from "./provider/taskProvider"
import {FinancialRequestProvider} from "./provider/financialRequestProvider"
import {RecruitmentRequestProvider} from "./provider/recruitmentRequestProvider"
import * as webpack from 'webpack';
const path = require('path');

const config = require('../../webpack.config.dev.js');
const compiler = webpack(config);

var port = process.env.PORT || 3000;

export function configureExpress():Promise<any> {
	return Promise
		.resolve(express())
			.then((app) => {
				if(process.env.NODE_ENV !== 'production') {
					app.use(require('webpack-dev-middleware')(compiler, {
						noInfo: true,
						publicPath:config.output.publicPath
					}));
					app.use(require('webpack-hot-middleware')(compiler));
				}
			app.use(express.static('dist'));

			app.use(bodyParser.json());
			app.use(function(req, res, next) { // Allow while development is ongoing
				res.header("Access-Control-Allow-Origin", "*");
				res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
				res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
				next();
			});
			return app;
		});
}

export function congifureRoutes(app:express.Application, storageManager:StorageManager):Promise<any> {
	return new Promise((resolve) => {
		let routeProvider = new RouteProvider(storageManager);
		let employeeProvider = new EmployeeProvider(storageManager);
		let clientProvider = new ClientProvider(storageManager);
		let eventRequestProvider = new EventRequestProvider(storageManager);
		let eventProvider = new EventProvider(storageManager);
		let applicationProvider = new ApplicationProvider(storageManager);
		let taskProvider = new TaskProvider(storageManager);
		let financialRequestProvider = new FinancialRequestProvider(storageManager);
		let recruitmentRequestProvider = new RecruitmentRequestProvider(storageManager);

		app.post("/api/login", routeProvider.login);

		app.get("/api/department/:id/employee", employeeProvider.getEmployeesForDepartmentId);
		app.get("/api/department/:id/event",routeProvider.getAllEventsWithApplicationTasksForDepartment);

		app.get("/api/employee", routeProvider.getAllEmployees);
		app.post("/api/employee", employeeProvider.createEmployee);
		app.get("/api/employee/:id/task", taskProvider.getTasksForEmployeeId);

		app.get("/api/client", routeProvider.getAllClients);
		app.post("/api/client", routeProvider.postClient);
		app.get("/api/client/:id/event", routeProvider.getAllEventsForClientId);

		app.get("/api/request/event", routeProvider.getAllEventRequests);
		app.post("/api/request/event", eventRequestProvider.createEventRequest);
		app.put("/api/request/event/:id", routeProvider.putEventRequest);
		app.put("/api/request/event/:id/status", routeProvider.putEventRequestStatus);

		app.get("/api/event", routeProvider.getAllEvents);
		app.post("/api/event", eventProvider.createEvent);
		app.get("/api/event/:eid/department/:did/tasks", routeProvider.getAllTasksForEventAndDepartment);

		app.get("/api/application", routeProvider.getAllApplications);
		app.post("/api/application", routeProvider.postApplication);

		app.get("/api/task", routeProvider.getAllTasks);
		app.post("/api/task", routeProvider.postTask);

		app.get("/api/request/financial", routeProvider.getAllFinancialRequests);
		app.post("/api/request/financial", financialRequestProvider.createFinancialRequest);

		app.get("/api/request/recruitment", routeProvider.getAllRecruitmentRequests);
		app.post("/api/request/recruitment", recruitmentRequestProvider.createRecruitmentRequest);

		app.get("/api/jobapplication", routeProvider.getAllJobApplications);
		app.post("/api/jobapplication", routeProvider.postJobApplication);

		resolve();
	});
}

export function start():Promise<any> {
    let storageManager = new SequelizeStorageManager();

    return storageManager.init()
        .then(() => {
            return configureExpress()
                .then((app:express.Application) => {
                    return congifureRoutes(app, storageManager)
                        .then(() => {
                            return app;
                        });
                })
                .then((app:express.Application) => {
                    return new Promise((resolve) => {
                        var server = app.listen(port, () => {
                            console.log("Server listening on port " + port);
                            resolve(server);
                        });
                    });
                })
        });
}
