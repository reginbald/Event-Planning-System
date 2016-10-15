import {StorageManager} from "./storage";

export class LoginProvider {

    private storageManager:StorageManager;

    constructor(storageManager:StorageManager) {
        this.storageManager = storageManager;
    }

    login = (req:any, res:any) => {
        if(!req.body.hasOwnProperty('username')) {
            return res.status(412).send('ERROR_412_USERNAME');
        }
        if(!req.body.hasOwnProperty('password')) {
            return res.status(412).send('ERROR_412_PASSWORD');
        }
        let results:any = this.storageManager.getEmployeeByUsernameAndPassword(req.body.username, req.body.password);
        results.then((results) => {
            if (results === null) {
                res.status(401).send("ERROR_LOGIN");
            } else {
                res.send(results.dataValues);
            }
        })
    };
}
