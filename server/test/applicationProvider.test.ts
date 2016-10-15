/// <reference path="../../typings/mocha/mocha.d.ts" />
/// <reference path="../../typings/chai/chai.d.ts" />
import { expect } from 'chai';

import {ApplicationProvider} from "../provider/ApplicationProvider";
import {MockStorageManager} from "./mock/mockStorage";
import {MockResponse} from "./mock/mockResponse";
import {MockRequest} from "./mock/mockRequest";

describe('ApplicationProvider', () => {
	var mockStorage: MockStorageManager;
	var mocResponse: MockResponse;
	var subject: ApplicationProvider;

	beforeEach(function() {
		mockStorage = new MockStorageManager();
		mocResponse = new MockResponse();
		mockStorage.ApplicationList = [{id: "0", eventid: "0"}, {id: "1", eventid: "1"}];
		subject = new ApplicationProvider(mockStorage);
	});

	describe('get all applications', () => {
		it('should return all applications', () => {
			let req = new MockRequest({}, {});
			subject.getAllApplications(req, mocResponse);
			expect(mocResponse.data).to.deep.equal([{id: "0", eventid: "0"}, {id: "1", eventid: "1"}]);
		});
	});
});
