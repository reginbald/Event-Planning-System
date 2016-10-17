import {StorageManager} from "./storage";
import {NewApplicationViewModel} from "../viewModels/newApplicationViewModel";

export class ApplicationProvider {

	private storageManager:StorageManager;

	constructor(storageManager:StorageManager) {
			this.storageManager = storageManager;
	}

	getAllApplications = (succ:Function, err:Function) => {
		this.storageManager.getApplications(succ, err);
	}

	createApplication = (newApp:NewApplicationViewModel, succ:Function, err:Function) =>{
		this.storageManager.createApplication(newApp, succ, err);
	}
}