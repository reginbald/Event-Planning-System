import {StorageManager} from "./storage";

export class JobApplicationProvider {

	private storageManager:StorageManager;

	constructor(storageManager:StorageManager) {
			this.storageManager = storageManager;
	}

	getAllJobApplications = (succ:Function, err:Function) => {
		this.storageManager.getJobApplications(succ, err);
	};

	createJobApplication = (application:any, succ:Function, err:Function) => {
		this.storageManager.createJobApplication(application, succ, err);
	};
}