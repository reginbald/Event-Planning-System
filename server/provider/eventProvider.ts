import {StorageManager} from "./storage";

export class EventProvider {

	private storageManager:StorageManager;

	constructor(storageManager:StorageManager) {
			this.storageManager = storageManager;
	}

	getAllEvents = (succ:Function, err:Function) => {
		this.storageManager.getEvents(succ, err);
	}

	getAllEventsWithApplicationTasksForDepartment = (departmentId: number, succ:Function, err:Function) => {
		this.storageManager.getAllEventsWithApplicationTasksForDepartment(departmentId, (events) => {
			succ(events);
		}, err);
	}

	createEvent = (req:any, res:any) => {
		this.storageManager.createEvent(req.body)
		.then((results) => {
			res.send(results);
		}).catch((err) => {
			res.status(500).send(err.message);
		});
	};
	getAllEventsForClientId = (id:number, succ:Function, err:Function) => {
		this.storageManager.getEventsForClientId(id, succ, err);
	}
}
