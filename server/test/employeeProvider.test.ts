/// <reference path="../../typings/mocha/mocha.d.ts" />
/// <reference path="../../typings/chai/chai.d.ts" />
import { expect } from 'chai';

import {EmployeeProvider} from "../provider/employeeProvider";
import {MockStorageManager} from "./mock/mockStorage";
import {MockResponse} from "./mock/mockResponse";
import {MockRequest} from "./mock/mockRequest";

describe('employeeProvider', () => {
	var mockStorage: MockStorageManager;
	var mocResponse: MockResponse;
	var subject: EmployeeProvider;
	var result: any;
	var newEmployee: any;

	beforeEach(function() {
		mockStorage = new MockStorageManager();
		mocResponse = new MockResponse();
		subject = new EmployeeProvider(mockStorage);
		mockStorage.EmployeeList = [{name: "employee1", departmentid: "0"}, {name: "employee2", departmentid: "0"}];
		newEmployee = {name: "name", email: "email@email.com"};
	});

	describe('getAllEmployees function', () => {
		it('should return empty list', () => {
			mockStorage.EmployeeList = [];
			subject.getAllEmployees((employees) => {
				expect(employees).to.deep.equal(mockStorage.EmployeeList);
			}, () => {});
		});
		it('should return all employees', () => {
			subject.getAllEmployees((employees) => {
				expect(employees).to.deep.equal(mockStorage.EmployeeList);
			}, () => {});
		});
	});
	describe('get employees for department id', () => {
		it('should return all employees for department id', () => {
			let req = new MockRequest({}, {id: "0"});
			subject.getEmployeesForDepartmentId(req, mocResponse);
			expect(mocResponse.data).to.deep.equal(mockStorage.EmployeeList);
		});
	});
	describe('create new employee', () => {
		it('should return new employee details', () => {
			let req = new MockRequest(newEmployee, {});
			subject.createEmployee(req, mocResponse);
			expect(mocResponse.data).to.deep.equal(newEmployee);
		});
		it('should return error on missing properties', () => {
			let req = new MockRequest({name: "name", error: true}, {});
			subject.createEmployee(req, mocResponse);
			expect(mocResponse.data).to.deep.equal("error");
		});
	});
});
