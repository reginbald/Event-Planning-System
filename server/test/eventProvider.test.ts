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
			expect(mocResponse.data).to.deep.equal(mockStorage.EventList);
		});
	});
	describe('create event', () => {
		it('should return the newly created event', () => {
			let req = new MockRequest(newEvent, {});
			subject.createEvent(req, mocResponse);
			expect(mocResponse.data).to.deep.equal(newEvent);
		});
	});
	describe('getAllEventsForClientId', () => {
		it('should return all events with clientid == id', () => {
			mockStorage.EventList = [{id: 0, clientid: 0, name: "name1"}, {id: 1, clientid: 0, name: "name2"}]
			subject.getAllEventsForClientId(0, (data)=>{
				expect(data).to.deep.equal(mockStorage.EventList);
			}, ()=>{});
		});
		it('should return emptylist on no matching clientid', () => {
			mockStorage.EventList = [{id: 0, clientid: 0, name: "name1"}, {id: 1, clientid: 0, name: "name2"}]
			subject.getAllEventsForClientId(99, (data)=>{
				expect(data).to.deep.equal([]);
			}, ()=>{});
		});
	});
});
