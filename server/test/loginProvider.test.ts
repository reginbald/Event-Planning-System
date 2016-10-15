/// <reference path="../../typings/mocha/mocha.d.ts" />
/// <reference path="../../typings/chai/chai.d.ts" />
import { expect } from 'chai';

import {LoginProvider} from "../provider/loginProvider";
import {MockStorageManager} from "./mock/mockStorage";
import {MockResponse} from "./mock/mockResponse";

describe('loginProvider', () => {
	var mockStorage: MockStorageManager;
	var mocResponse: MockResponse;
	var subject: LoginProvider;
	var result: any;

	beforeEach(function() {
		mockStorage = new MockStorageManager();
		mocResponse = new MockResponse();
		mockStorage.EmployeeList = [{username: "user", password: "pass"}]
		subject = new LoginProvider(mockStorage);
	});

	describe('Successful login', () => {
		it('should return employee details', () => {
			let req = {"params": { "user": "user", "pass": "pass"}};
			subject.login(req, mocResponse);
			expect(mocResponse.data).to.deep.equal({username: "user", password: "pass"});
		});
	});

	describe('Unsuccessful login', () => {
		it('should return LOGIN_ERROR', () => {
			let req = {"params": { "user": "user", "pass": ""}};
			subject.login(req, mocResponse);
			expect(mocResponse.data).to.deep.equal("LOGIN_ERROR");
		});
	});
});
