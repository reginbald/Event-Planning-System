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
	createClient = (req:any, res:any) => {
		this.storageManager.createClient(req.body)
		.then((results) => {
			res.send(results);
		}).catch((err) => {
			res.status(500).send(err.message);
		});
	};
}
