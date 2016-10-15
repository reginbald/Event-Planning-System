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

	beforeEach(function() {
		mockStorage = new MockStorageManager();
		mocResponse = new MockResponse();
		mockStorage.FinancialRequestList = [{id: "0", name: "amount0"}, {id: "1", name: "amount1"}]
		subject = new FinancialRequestProvider(mockStorage);
	});

	describe('get all financial requests', () => {
		it('should return all financial requests', () => {
			let req = new MockRequest({}, {});
			subject.getAllFinancialRequests(req, mocResponse);
			expect(mocResponse.data).to.deep.equal([{id: "0", name: "amount0"}, {id: "1", name: "amount1"}]);
		});
	});
});
