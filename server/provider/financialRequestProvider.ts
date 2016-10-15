import {StorageManager} from "./storage";

export class FinancialRequestProvider {

	private storageManager:StorageManager;

	constructor(storageManager:StorageManager) {
			this.storageManager = storageManager;
	}

	getAllFinancialRequests = (req:any, res:any) => {
		this.storageManager.getFinancialRequests()
		.then((results) => {
			res.send(results);
		})
	};
}