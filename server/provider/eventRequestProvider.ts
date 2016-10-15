import {StorageManager} from "./storage";

export class EventRequestProvider {

    private storageManager:StorageManager;

    constructor(storageManager:StorageManager) {
        this.storageManager = storageManager;
    }

    getAllEventRequests = (req:any, res:any) => {
			this.storageManager.getEventRequests()
			.then((results) => {
				res.send(results);
			})
    };
}
