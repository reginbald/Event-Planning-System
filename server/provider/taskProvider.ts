import {StorageManager} from "./storage";

export class TaskProvider {

	private storageManager:StorageManager;

	constructor(storageManager:StorageManager) {
			this.storageManager = storageManager;
	}

	getAllTasks = (req:any, res:any) => {
		this.storageManager.getTasks()
		.then((results) => {
			res.send(results);
		})
	};
	getTasksForEmployeeId = (req:any, res:any) => {
		this.storageManager.getTasksForEmployeeId(req.params.id)
		.then((results) => {
			res.send(results);
		}).catch((err) => {
			res.status(500).send(err.message);
		});
	};
	createTask = (req:any, res:any) => {
		this.storageManager.createTask(req.body)
		.then((results) => {
			res.send(results);
		}).catch((err) => {
			res.status(500).send(err.message);
		});
	};
}