import {StorageManager} from "./storage";

export class FinancialRequestProvider {

	private storageManager:StorageManager;

	constructor(storageManager:StorageManager) {
			this.storageManager = storageManager;
	}

	getAllFinancialRequests = (succ:Function, err:Function) => {
		this.storageManager.getFinancialRequests(succ,err);
	};

	createFinancialRequest = (req:any, res:any) => {
		this.storageManager.createFinancialRequest(req.body)
		.then((results) => {
			res.send(results);
		}).catch((err) => {
			res.status(500).send(err.message);
		});
	};
}