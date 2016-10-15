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

	beforeEach(function() {
		mockStorage = new MockStorageManager();
		mocResponse = new MockResponse();
		mockStorage.TaskList = [{id: "0", applicationid: "0"}, {id: "1", applicationid: "1"}];
		subject = new TaskProvider(mockStorage);
	});

	describe('get all tasks', () => {
		it('should return all tasks', () => {
			let req = new MockRequest({}, {});
			subject.getAllTasks(req, mocResponse);
			expect(mocResponse.data).to.deep.equal([{id: "0", applicationid: "0"}, {id: "1", applicationid: "1"}]);
		});
	});
});
