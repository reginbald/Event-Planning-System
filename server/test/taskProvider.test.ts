/// <reference path="../../typings/mocha/mocha.d.ts" />
/// <reference path="../../typings/chai/chai.d.ts" />
import { expect } from 'chai';

import {TaskProvider} from "../provider/taskProvider";
import {MockStorageManager} from "./mock/mockStorage";
import {MockResponse} from "./mock/mockResponse";
import {MockRequest} from "./mock/mockRequest";

describe('TaskProvider', () => {
	var mockStorage: MockStorageManager;
	var mocResponse: MockResponse;
	var subject: TaskProvider;
	var newTask: any;

	beforeEach(function() {
		mockStorage = new MockStorageManager();
		mocResponse = new MockResponse();
		mockStorage.TaskList = [{id: "0", applicationid: "0", employeeid: "0"}, {id: "1", applicationid: "1", employeeid: "1"}];
		subject = new TaskProvider(mockStorage);
		newTask = {
			"applicationid": 2,
			"employeeid": 0,
			"senderid": 1,
			"type": "",
			"description": "",
			"priority": ""
		}
	});

	describe('getAllTasks function', () => {
		it('should return all tasks', () => {
			subject.getAllTasks((tasks) => {
				expect(tasks).to.deep.equal(mockStorage.TaskList);
			}, () => {});
		});
	});
	describe('get tasks for employee id', () => {
		it('should return all tasks for employee id', () => {
			let req = new MockRequest({}, {id: "0"});
			subject.getTasksForEmployeeId(req, mocResponse);
			expect(mocResponse.data).to.deep.equal([{id: "0", applicationid: "0", employeeid: "0"}]);
		});
	});
	describe('create task', () => {
		it('should return the newly created task', () => {
			let req = new MockRequest(newTask, {});
			subject.createTask(req, mocResponse);
			expect(mocResponse.data).to.deep.equal(newTask);
		});
	});
	describe('getAllTasksForEventAndDepartment function', () => {
		it('should return all tasks for an event and department', () => {
			mockStorage.ApplicationList = [{id: 0, departmentid: 0, eventid: 0}];
			subject.getAllTasksForEventAndDepartment(0, 0, (tasks) => {
				expect(tasks).to.deep.equal({applicationid: 0, tasks: [{id: "0", applicationid: "0", employeeid: "0"}]});
			}, () =>{});
		});
		it('should return NOT_FOUND if application is not found', () => {
			mockStorage.ApplicationList = [{id: 0, departmentid: 0, eventid: 0}];
			subject.getAllTasksForEventAndDepartment(99, 99, () => {}, (error) =>{
				expect(error).to.deep.equal("NOT_FOUND");
			});
		});
		it('should return DB_ERROR if database fails', () => {
			mockStorage.dbERROR = true;
			mockStorage.ApplicationList = [{id: 0, departmentid: 0, eventid: 0}];
			subject.getAllTasksForEventAndDepartment(0, 0, () => {}, (error) =>{
				expect(error).to.deep.equal("DB_ERROR");
			});
		});
	});
});
