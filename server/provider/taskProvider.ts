import {StorageManager} from "./storage";
import {NewTaskViewModel} from "../viewModels/newTaskViewModel";

export class TaskProvider {

	private storageManager:StorageManager;

	constructor(storageManager:StorageManager) {
			this.storageManager = storageManager;
	}

	getAllTasks = (succ:Function, err:Function) => {
		this.storageManager.getTasks(succ, err);
	};
	getTasksForEmployeeId = (req:any, res:any) => {
		this.storageManager.getTasksForEmployeeId(req.params.id)
		.then((results) => {
			res.send(results);
		}).catch((err) => {
			res.status(500).send(err.message);
		});
	};
	createTask = (newTask:NewTaskViewModel, succ:Function, err:Function) => {
		this.storageManager.createTask(newTask, succ, err);
	};

	getAllTasksForEventAndDepartment = (eventId:number, departmentId, succ:Function, err:Function) => {
		this.storageManager.getApplicationForEventAndDepartment(eventId, departmentId, (application) => {
			if (application === null) {
				return err("NOT_FOUND");
			}
			this.storageManager.getTasksForApplication(application.id, (tasks) => {
				succ({
						"applicationid": application.id, 
						"tasks": tasks
					});
			}, err);
		}, err);
	};
}