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
	var newEventRequest: any;

	beforeEach(function() {
		mockStorage = new MockStorageManager();
		mocResponse = new MockResponse();
		mockStorage.EventRequestList = [{id: "0", name: "name1"}, {id: "1", name: "name2"}]
		newEventRequest = {
			budget:"900",
			clientid:"Vlad",
			decorations:true,
			drinks:false,
			enddate:"Sat Oct 29 2016 00:00:00 GMT+0200 (CEST)",
			eventtype:"Birthday",
			food:false,
			numberofattendees:"22",
			parties:false,
			photosfilming:true,
			startdate:"Sat Oct 22 2016 00:00:00 GMT+0200 (CEST)"
		};
		subject = new EventRequestProvider(mockStorage);
	});

	describe('get all event reqeusts', () => {
		it('should return all event requests', () => {
			let req = new MockRequest({}, {});
			subject.getAllEventRequests(req, mocResponse);
			expect(mocResponse.data).to.deep.equal([{id: "0", name: "name1"}, {id:"1", name: "name2"}]);
		});
	});
	describe('create event reqeust', () => {
		it('should return the created event request', () => {
			let req = new MockRequest(newEventRequest, {});
			subject.createEventRequest(req, mocResponse);
			expect(mocResponse.data).to.deep.equal(newEventRequest);
		});
		it('should return error on missing properties', () => {
			let req = new MockRequest({budget:"900", clientid:"Vlad", error: true}, {});
			subject.createEventRequest(req, mocResponse);
			expect(mocResponse.data).to.deep.equal("error");
		});
	});
	describe('update event reqeust', () => {
		it('should return the updated event request', () => {
			let req = new MockRequest({name: 'update'}, {id: "1"});
			subject.updateEventRequest(req, mocResponse);
			expect(mocResponse.data).to.deep.equal({id: "1", name: "update"});
		});
		it('should return the updated event request', () => {
			let req = new MockRequest({name: 'update'}, {id: "99"});
			subject.updateEventRequest(req, mocResponse);
			expect(mocResponse.data).to.deep.equal("ERROR_404_EVENT_REQUEST_NOT_FOUND");
		});
	});
});
