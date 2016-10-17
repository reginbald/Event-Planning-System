import {StorageManager} from "./storage";

export class ApplicationProvider {

	private storageManager:StorageManager;

	constructor(storageManager:StorageManager) {
			this.storageManager = storageManager;
	}

	getAllApplications = (succ:Function, err:Function) => {
		this.storageManager.getApplications(succ, err);
	}

	//getAllApplications = (req:any, res:any) => {
	//	this.storageManager.getApplications()
	//	.then((results) => {
	//		res.send(results);
	//	})
	//};
	createApplication = (req:any, res:any) => {
		this.storageManager.createApplication(req.body)
		.then((results) => {
			res.send(results);
		}).catch((err) => {
			res.status(500).send(err.message);
		});
	};
}