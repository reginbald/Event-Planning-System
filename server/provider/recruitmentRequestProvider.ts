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
}