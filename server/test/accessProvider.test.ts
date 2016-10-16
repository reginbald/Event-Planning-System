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
		mockStorage.EmployeeList = [{username: "user", password: "pass"}]
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
			expect(mocResponse.data).to.deep.equal({username: "user", password: "pass"});
		});
	});

	describe('Unsuccessful login', () => {
		it('should return LOGIN_ERROR', () => {
			let req = new MockRequest({ "username": "user", "password": ""}, {});
			subject.login(req, mocResponse);
			expect(mocResponse.data).to.deep.equal("ERROR_LOGIN");
		});
	});
});
