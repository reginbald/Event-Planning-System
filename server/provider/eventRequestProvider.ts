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
	createEventRequest = (req:any, res:any) => {
		this.storageManager.createEventRequest(req.body)
		.then((results) => {
			res.send(results);
		}).catch((err) => {
			res.status(500).send(err.message);
		});
	};
	updateEventRequest = (req:any, res:any) => {
		this.storageManager.updateEventRequest(req.params.id, req.body)
		.then((results) => {
			if(results[0] === 1){
				return this.storageManager.getEventRequestById(+req.params.id, (eventRequest) => {
					res.send(eventRequest);
				}, (error) => {
					res.status(500).send(error.message);
				})
			} else {
				res.status(404).send("ERROR_404_EVENT_REQUEST_NOT_FOUND");
			}
		}).catch((error) => {
			res.status(500).send(error.message);
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
