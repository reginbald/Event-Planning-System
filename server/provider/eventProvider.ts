import {StorageManager} from "./storage";

export class EventProvider {

	private storageManager:StorageManager;

	constructor(storageManager:StorageManager) {
			this.storageManager = storageManager;
	}

	getAllEvents = (req:any, res:any) => {
		this.storageManager.getEvents()
		.then((results) => {
			res.send(results);
		})
	};
}
