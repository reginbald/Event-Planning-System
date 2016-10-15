/// <reference path="../../typings/mocha/mocha.d.ts" />
/// <reference path="../../typings/chai/chai.d.ts" />
import { expect } from 'chai';

import {EventRequestProvider} from "../provider/eventRequestProvider";
import {MockStorageManager} from "./mock/mockStorage";
import {MockResponse} from "./mock/mockResponse";
import {MockRequest} from "./mock/mockRequest";

describe('eventRequestProvider', () => {
	var mockStorage: MockStorageManager;
	var mocResponse: MockResponse;
	var subject: EventRequestProvider;
	var result: any;

	beforeEach(function() {
		mockStorage = new MockStorageManager();
		mocResponse = new MockResponse();
		mockStorage.EventRequestList = [{name: "name1"}, {name: "name2"}]
		subject = new EventRequestProvider(mockStorage);
	});

	describe('get all event reqeusts', () => {
		it('should return all event requests', () => {
			let req = new MockRequest({});
			subject.getAllEventRequests(req, mocResponse);
			expect(mocResponse.data).to.deep.equal([{name: "name1"}, {name: "name2"}]);
		});
	});
});
