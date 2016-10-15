/// <reference path="../../typings/mocha/mocha.d.ts" />
/// <reference path="../../typings/chai/chai.d.ts" />
import { expect } from 'chai';

import {EventProvider} from "../provider/eventProvider";
import {MockStorageManager} from "./mock/mockStorage";
import {MockResponse} from "./mock/mockResponse";
import {MockRequest} from "./mock/mockRequest";

describe('EventProvider', () => {
	var mockStorage: MockStorageManager;
	var mocResponse: MockResponse;
	var subject: EventProvider;
	var result: any;
	var newEvent:any;

	beforeEach(function() {
		mockStorage = new MockStorageManager();
		mocResponse = new MockResponse();
		subject = new EventProvider(mockStorage);
		newEvent = {
			name: "event"
		}
	});

	describe('get all events', () => {
		it('should return empty list if no events exist', () => {
			let req = new MockRequest({}, {});
			subject.getAllEvents(req, mocResponse);
			expect(mocResponse.data).to.deep.equal([]);
		});
		it('should return all events', () => {
			let req = new MockRequest({}, {});
			mockStorage.EventList = [{id: "0", name: "name1"}, {id: "1", name: "name2"}]
			subject.getAllEvents(req, mocResponse);
			expect(mocResponse.data).to.deep.equal([{id: "0", name: "name1"}, {id:"1", name: "name2"}]);
		});
	});
	describe('create event', () => {
		it('should return the newly created event', () => {
			let req = new MockRequest(newEvent, {});
			subject.createEvent(req, mocResponse);
			expect(mocResponse.data).to.deep.equal(newEvent);
		});
	});
});
