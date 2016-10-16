/// <reference path="../typings/express/express.d.ts" />
/// <reference path="../typings/body-parser/body-parser.d.ts" />

import * as express from "express";
import * as bodyParser from "body-parser";
import {StorageManager, SequelizeStorageManager} from "./provider/storage";
import {LoginProvider} from "./provider/loginProvider";
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
      return app;
    });
}

export function congifureRoutes(app:express.Application, storageManager:StorageManager):Promise<any> {
  return new Promise((resolve) => {
    let loginProvider = new LoginProvider(storageManager);
    let employeeProvider = new EmployeeProvider(storageManager);
    let clientProvider = new ClientProvider(storageManager);
    let eventRequestProvider = new EventRequestProvider(storageManager);
    let eventProvider = new EventProvider(storageManager);
    let applicationProvider = new ApplicationProvider(storageManager);
    let taskProvider = new TaskProvider(storageManager);
    let financialRequestProvider = new FinancialRequestProvider(storageManager);
    let recruitmentRequestProvider = new RecruitmentRequestProvider(storageManager);

    app.post("/api/login", loginProvider.login);

    app.get("/api/employee", employeeProvider.getAllEmployees);
    app.post("/api/employee", employeeProvider.createEmployee);

    app.get("/api/client", clientProvider.getAllClients);
    app.post("/api/client", clientProvider.createClient);

    app.get("/api/request/event", eventRequestProvider.getAllEventRequests);
    app.post("/api/request/event", eventRequestProvider.createEventRequest);
    app.put("/api/request/event/:id", eventRequestProvider.updateEventRequest);

    app.get("/api/event", eventProvider.getAllEvents);
    app.post("/api/event", eventProvider.createEvent);

    app.get("/api/application", applicationProvider.getAllApplications);
    app.post("/api/application", applicationProvider.createApplication);

    app.get("/api/task", taskProvider.getAllTasks);
    app.post("/api/task", taskProvider.createTask);
    app.get("/api/task/:id", taskProvider.getTasksForEmployeeId);

    app.get("/api/request/financial", financialRequestProvider.getAllFinancialRequests);
    app.post("/api/request/financial", financialRequestProvider.createFinancialRequest);

    app.get("/api/request/recruitment", recruitmentRequestProvider.getAllRecruitmentRequests);
    app.post("/api/request/recruitment", recruitmentRequestProvider.createRecruitmentRequest);

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
