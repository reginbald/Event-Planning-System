import {StorageManager} from "./storage";
import {NewClientViewModel} from "../viewModels/newClientViewModel";

export class ClientProvider {

	private storageManager:StorageManager;

	constructor(storageManager:StorageManager) {
			this.storageManager = storageManager;
	}

	getAllClients = (succ:Function, err:Function) => {
		this.storageManager.getClients(succ, err);
	};

	createClient = (newClient:NewClientViewModel, succ:Function, err:Function) => {
		this.storageManager.createClient(newClient, succ, err);
	};
}
