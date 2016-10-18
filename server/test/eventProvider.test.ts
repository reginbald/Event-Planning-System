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

	beforeEach(function() {
		mockStorage = new MockStorageManager();
		mocResponse = new MockResponse();
		subject = new EventProvider(mockStorage);
		mockStorage.EventList = [{id: 0, clientid: 0, name: "name1"}, {id: 1, clientid: 0, name: "name2"}];
	});

	describe('getAllEvents function', () => {
		it('should return empty list', () => {
			mockStorage.EventList = [];
			subject.getAllEvents((events) => {
				expect(events).to.deep.equal(mockStorage.EventList);
			}, () => {});
		});
		it('should return all events', () => {
			subject.getAllEvents((events) => {
				expect(events).to.deep.equal(mockStorage.EventList);
			}, () => {});
		});
	});
	describe('create event', () => {
		it('should return the newly created event', () => {
			let newEvent = {
				name: "event"
			}
			let req = new MockRequest(newEvent, {});
			subject.createEvent(req, mocResponse);
			expect(mocResponse.data).to.deep.equal(newEvent);
		});
	});
	describe('getAllEventsForClientId', () => {
		it('should return all events with clientid == id', () => {
			subject.getAllEventsForClientId(0, (data)=>{
				expect(data).to.deep.equal(mockStorage.EventList);
			}, ()=>{});
		});
		it('should return emptylist on no matching clientid', () => {
			subject.getAllEventsForClientId(99, (data)=>{
				expect(data).to.deep.equal([]);
			}, ()=>{});
		});
	});
});
