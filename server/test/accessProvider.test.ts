/// <reference path="../../typings/mocha/mocha.d.ts" />
/// <reference path="../../typings/chai/chai.d.ts" />
import { expect } from 'chai';

import {AccessProvider} from "../provider/accessProvider";
import {MockStorageManager} from "./mock/mockStorage";
import {MockResponse} from "./mock/mockResponse";
import {MockRequest} from "./mock/mockRequest";

describe('AccessProvider', () => {
	var mockStorage: MockStorageManager;
	var mocResponse: MockResponse;
	var subject: AccessProvider;
	var result: any;

	beforeEach(function() {
		mockStorage = new MockStorageManager();
		mocResponse = new MockResponse();
		mockStorage.EmployeeList = [{id: 0, username: "user", password: "pass", access: 0}]
		subject = new AccessProvider(mockStorage);
	});

	describe('login', () => {
		it('should give error if username is missing', () => {
			let req = new MockRequest({}, {});
			subject.login(req, mocResponse);
			expect(mocResponse.data).to.deep.equal("ERROR_412_USERNAME");
		});
		it('should give error if password is missing', () => {
			let req = new MockRequest({"username": "user"}, {});
			subject.login(req, mocResponse);
			expect(mocResponse.data).to.deep.equal("ERROR_412_PASSWORD");
		});
	});

	describe('Successful login', () => {
		it('should return employee details', () => {
			let req = new MockRequest({ "username": "user", "password": "pass"}, {});
			subject.login(req, mocResponse);
			expect(mocResponse.data).to.deep.equal({id: 0, username: "user", password: "pass", access: 0});
		});
	});

	describe('Unsuccessful login', () => {
		it('should return LOGIN_ERROR', () => {
			let req = new MockRequest({ "username": "user", "password": ""}, {});
			subject.login(req, mocResponse);
			expect(mocResponse.data).to.deep.equal("ERROR_LOGIN");
		});
	});

	describe('user access', () => {
		it('should return ERROR_ACCESS_DENIED on wrong access level', () => {
			subject.checkAccess(0, [1,2,3], () => {}, (error)=> {
				expect(error).to.deep.equal("ERROR_ACCESS_DENIED");
			});
		});
		it('should return ERROR_EMPLOYEE_NOT_FOUND on wrong employee id', () => {
			subject.checkAccess(99, [1,2,3], () => {}, (error)=> {
				expect(error).to.deep.equal("ERROR_EMPLOYEE_NOT_FOUND");
			});
		});
		it('should return ERROR_DATABASE on db error', () => {
			mockStorage.dbERROR = true;
			subject.checkAccess(0, [1,2,3], () => {}, (error)=> {
				expect(error).to.deep.equal("ERROR_DATABASE");
			});
		});
		it('should return employee element on currect access level', () => {
			subject.checkAccess(0, [0,1,2,3], () => {}, (error)=> {
				expect(error).to.deep.equal({id: 0, username: "user", access: 0});
			});
		});
	});
});
