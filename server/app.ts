import * as express from "express";
import {StorageManager, SequelizeStorageManager} from "./provider/storage";
import {EmployeeProvider} from "./provider/employeeProvider";
import * as webpack from 'webpack';
const path = require('path');

const config = require('../webpack.config.dev.js');
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
      //app.use(bodyParser.json());
      //app.use(bodyParser.urlencoded({extended: false}));
      return app;
    });
}

export function congifureRoutes(app:express.Application, storageManager:StorageManager):Promise<any> {
  return new Promise((resolve) => {
    let employeeProvider = new EmployeeProvider(storageManager);
    console.log("env" + process.env.NODE_ENV);
    app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/index.html'));
    });
    app.get("/api/employee", employeeProvider.getAllEmployees);

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
