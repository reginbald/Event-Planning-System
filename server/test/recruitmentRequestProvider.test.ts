/// <reference path="../../typings/mocha/mocha.d.ts" />
/// <reference path="../../typings/chai/chai.d.ts" />
import { expect } from 'chai';

import {RecruitmentRequestProvider} from "../provider/recruitmentRequestProvider";
import {MockStorageManager} from "./mock/mockStorage";
import {MockResponse} from "./mock/mockResponse";
import {MockRequest} from "./mock/mockRequest";

describe('RecruitmentRequestProvider', () => {
	var mockStorage: MockStorageManager;
	var mocResponse: MockResponse;
	var subject: RecruitmentRequestProvider;
	var result: any;

	beforeEach(function() {
		mockStorage = new MockStorageManager();
		mocResponse = new MockResponse();
		mockStorage.RecruitmentRequestList = [{id: "0", job_title: "job0"}, {id: "1", job_title: "job1"}];
		subject = new RecruitmentRequestProvider(mockStorage);
	});

	describe('get all recruitment requests', () => {
		it('should return all recruitment requests', () => {
			let req = new MockRequest({}, {});
			subject.getAllRecruitmentRequests(req, mocResponse);
			expect(mocResponse.data).to.deep.equal([{id: "0", job_title: "job0"}, {id: "1", job_title: "job1"}]);
		});
	});
});
