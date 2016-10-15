import {StorageManager} from "./storage";

export class RecruitmentRequestProvider {

	private storageManager:StorageManager;

	constructor(storageManager:StorageManager) {
			this.storageManager = storageManager;
	}

	getAllRecruitmentRequests = (req:any, res:any) => {
		this.storageManager.getRecruitmentRequests()
		.then((results) => {
			res.send(results);
		})
	};
	createRecruitmentRequest = (req:any, res:any) => {
		this.storageManager.createRecruitmentRequest(req.body)
		.then((results) => {
			res.send(results);
		}).catch((err) => {
			res.status(500).send(err.message);
		});
	};
}