import {StorageManager} from "./storage";

export class ClientProvider {

	private storageManager:StorageManager;

	constructor(storageManager:StorageManager) {
			this.storageManager = storageManager;
	}

	getAllClients = (req:any, res:any) => {
		this.storageManager.getClients()
		.then((results) => {
			res.send(results);
		})
	};
}
