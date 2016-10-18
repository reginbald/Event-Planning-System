import {StorageManager} from "./storage";

export class EventRequestProvider {

	private storageManager:StorageManager;

	constructor(storageManager:StorageManager) {
			this.storageManager = storageManager;
	}

	getAllEventRequests = (succ:Function, err:Function) => {
		this.storageManager.getEventRequests(succ, err);
	};
	createEventRequest = (req:any, res:any) => {
		this.storageManager.createEventRequest(req.body)
		.then((results) => {
			res.send(results);
		}).catch((err) => {
			res.status(500).send(err.message);
		});
	};
	updateEventRequest = (id:number, update:any, succ:Function, err:Function) => {
		this.storageManager.updateEventRequest(id, update, (results) => {
			if(results[0] === 1){
				return this.storageManager.getEventRequestById(id, (eventRequest) => {
					succ(eventRequest);
				}, (error) => {
					err(error.message);
				})
			} else {
				err("EVENT_REQUEST_NOT_FOUND");
			}
		}, (error) => {
			err(error.message);
		});
	};
	updateEventRequestStatus = (id:number, status:string, succ, err) => {
		this.storageManager.updateEventRequestStatus(id, status, (results) => {
			if(results[0] === 1){
				return this.storageManager.getEventRequestById(id, (eventrequest) => {
					succ(eventrequest);
				}, (error) => {
					err("ERROR_DATABASE");
				});
			} else {
				err("EVENT_REQUEST_NOT_FOUND");
			}
		}, (error) => {
			err("ERROR_DATABASE");
		});
	};
}
