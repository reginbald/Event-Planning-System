/// <reference path="../../typings/mocha/mocha.d.ts" />
/// <reference path="../../typings/chai/chai.d.ts" />
import { expect } from 'chai';

import * as express from "express";
import {EmployeeProvider} from "../provider/employeeProvider";
import {MockStorageManager} from "./mock/mockStorage";
import {MockRequest} from "./mock/mockRequest"; 
import {MockResponse} from "./mock/mockResponse";

describe('EmployeeProvider', () => {
	var mockStorage: MockStorageManager;
	var subject: EmployeeProvider;
	var response: MockResponse;
	var request: MockRequest;

	beforeEach(function() {
		request = new MockRequest();
		response = new MockResponse();
		mockStorage = new MockStorageManager();
		subject = new EmployeeProvider(mockStorage);
	});

	describe('get all employees from empty table', () => {
		it('should return an empty list ', () => {
			subject.getAllEmployees(request, response);
			setTimeout(() => { 
					expect(response.data).should.equal([]);
			}, 10); 
		});
	});
});
