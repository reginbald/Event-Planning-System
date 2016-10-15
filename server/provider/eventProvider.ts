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
	createEvent = (req:any, res:any) => {
		this.storageManager.createEvent(req.body)
		.then((results) => {
			res.send(results);
		}).catch((err) => {
			res.status(500).send(err.message);
		});
	};
}
