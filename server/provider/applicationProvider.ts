import {StorageManager} from "./storage";

export class ApplicationProvider {

	private storageManager:StorageManager;

	constructor(storageManager:StorageManager) {
			this.storageManager = storageManager;
	}

	getAllApplications = (req:any, res:any) => {
		this.storageManager.getApplications()
		.then((results) => {
			res.send(results);
		})
	};
}