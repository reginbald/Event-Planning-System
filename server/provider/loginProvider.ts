import {StorageManager} from "./storage";

export class LoginProvider {

    private storageManager:StorageManager;

    constructor(storageManager:StorageManager) {
        this.storageManager = storageManager;
    }

    login = (req:any, res:any) => {
        let results:any = this.storageManager.getEmployeeByUsernameAndPassword(req.params.user, req.params.pass);
        results.then((results) => {
            if (results === null) {
                res.send("LOGIN_ERROR");
            } else {
                res.status(401).send(results.dataValues);
            }
        })
    };
}
