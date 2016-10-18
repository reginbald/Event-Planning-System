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
		mockStorage.ApplicationList = [{id: 0, eventid: 0, departmentid: 0}];
		mockStorage.TaskList = [{applicationid: 0, type: "test1" }, {applicationid: 0, type: "test2" }];
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
	describe('getAllEventsForClientId function', () => {
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
	describe('getAllEventsWithApplicationTasksForDepartment function', () => {
		it('should return all events, applications and tasks for departmentid == id', () => {
			subject.getAllEventsWithApplicationTasksForDepartment(0, (data)=>{
				expect(data).to.deep.equal([{
					id: 0, 
					clientid: 0, 
					name: "name1", 
					applications:[{
						id: 0, 
						eventid: 0, 
						departmentid: 0,
						tasks: [
							{applicationid: 0, type: "test1" }, {applicationid: 0, type: "test2" }
						]
					}] 
				}, {id: 1, clientid: 0, name: "name2", applications:[]}]);
			}, ()=>{});
		});
		it('should return empty list if there are no events', () => {
			mockStorage.EventList = [];
			subject.getAllEventsWithApplicationTasksForDepartment(0, (data)=>{
				expect(data).to.deep.equal(mockStorage.EventList);
			}, ()=>{});
		});
	});
});
