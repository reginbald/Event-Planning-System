/// <reference path="../../typings/mocha/mocha.d.ts" />
/// <reference path="../../typings/chai/chai.d.ts" />
import { expect } from 'chai';

import {ClientProvider} from "../provider/clientProvider";
import {MockStorageManager} from "./mock/mockStorage";
import {MockResponse} from "./mock/mockResponse";
import {MockRequest} from "./mock/mockRequest";

describe('ClientProvider', () => {
	var mockStorage: MockStorageManager;
	var mocResponse: MockResponse;
	var subject: ClientProvider;
	var result: any;
	var newEventRequest: any;

	beforeEach(function() {
		mockStorage = new MockStorageManager();
		mocResponse = new MockResponse();
		mockStorage.ClientList = [{name: "name1"}, {name: "name2"}]
		newEventRequest = {};
		subject = new ClientProvider(mockStorage);
	});

	describe('get all clients', () => {
		it('should return all clients', () => {
			let req = new MockRequest({});
			subject.getAllClients(req, mocResponse);
			expect(mocResponse.data).to.deep.equal([{name: "name1"}, {name: "name2"}]);
		});
	});
	describe('create new client', () => {
		it('should return new client details', () => {
			let req = new MockRequest(newEventRequest);
			subject.createClient(req, mocResponse);
			expect(mocResponse.data).to.deep.equal(newEventRequest);
		});
		it('should return error on missing properties', () => {
			let req = new MockRequest({name: "name", error: true});
			subject.createClient(req, mocResponse);
			expect(mocResponse.data).to.deep.equal("error");
		});
	});
});
