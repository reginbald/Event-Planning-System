/// <reference path="../../typings/mocha/mocha.d.ts" />
/// <reference path="../../typings/chai/chai.d.ts" />
import { expect } from 'chai';

import {FinancialRequestProvider} from "../provider/financialRequestProvider";
import {MockStorageManager} from "./mock/mockStorage";
import {MockResponse} from "./mock/mockResponse";
import {MockRequest} from "./mock/mockRequest";

describe('FinancialRequestProvider', () => {
	var mockStorage: MockStorageManager;
	var mocResponse: MockResponse;
	var subject: FinancialRequestProvider;
	var result: any;
	var newFinRequest: any;

	beforeEach(function() {
		mockStorage = new MockStorageManager();
		mocResponse = new MockResponse();
		mockStorage.FinancialRequestList = [{id: "0", name: "amount0"}, {id: "1", name: "amount1"}]
		subject = new FinancialRequestProvider(mockStorage);
		newFinRequest = {id: "4", departmentid: "0", eventid: "0", amount: "200", reason: "reason"};
	});

	describe('getAllFinancialRequests function', () => {
		it('should return all financial requests', () => {
			subject.getAllFinancialRequests((requests) => {
				expect(requests).to.deep.equal(mockStorage.FinancialRequestList);
			}, 
			() => {});
		});
	});
	describe('create financial request', () => {
		it('should return the newly created request', () => {
			let req = new MockRequest(newFinRequest, {});
			subject.createFinancialRequest(req, mocResponse);
			expect(mocResponse.data).to.deep.equal(newFinRequest);
		});
	});
});
