/// <reference path="../../typings/mocha/mocha.d.ts" />
/// <reference path="../../typings/chai/chai.d.ts" />
import { expect } from 'chai';

import {EmployeeProvider} from "../provider/employeeProvider";
import {MockStorageManager} from "./mock/mockStorage";
import {MockResponse} from "./mock/mockResponse";

describe('employeeProvider', () => {
	var mockStorage: MockStorageManager;
	var mocResponse: MockResponse;
	var subject: EmployeeProvider;
	var result: any;

	beforeEach(function() {
		mockStorage = new MockStorageManager();
		mocResponse = new MockResponse();
		subject = new EmployeeProvider(mockStorage);
	});

	describe('get all employees', () => {
		it('should return empty list', () => {
			let req = {};
			subject.getAllEmployees(req, mocResponse);
			expect(mocResponse.data).to.deep.equal([]);
		});
		it('should return all employees', () => {
			let req = {"params": { "user": "user", "pass": ""}};
			mockStorage.EmployeeList = [{name: "employee1"}, {name: "employee2"}]
			subject.getAllEmployees(req, mocResponse);
			expect(mocResponse.data).to.deep.equal([{name: "employee1"}, {name: "employee2"}]);
		});
	});
});
