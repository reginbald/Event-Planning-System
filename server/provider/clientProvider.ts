import {StorageManager} from "./storage";

export class ClientProvider {

	private storageManager:StorageManager;

	constructor(storageManager:StorageManager) {
			this.storageManager = storageManager;
	}

	getAllClients = (succ:Function, err:Function) => {
		this.storageManager.getClients(succ, err);
	};
	
	createClient = (req:any, res:any) => {
		this.storageManager.createClient(req.body)
		.then((results) => {
			res.send(results);
		}).catch((err) => {
			res.status(500).send(err.message);
		});
	};
}
