/// <reference path="../../typings/mocha/mocha.d.ts" />
/// <reference path="../../typings/chai/chai.d.ts" />
import { expect } from 'chai';

import {JobApplicationProvider} from "../provider/jobApplicationProvider";
import {MockStorageManager} from "./mock/mockStorage";

describe('JobApplicationProvider', () => {
	var mockStorage: MockStorageManager;
	var subject: JobApplicationProvider;

	beforeEach(function() {
		mockStorage = new MockStorageManager();
		mockStorage.JobApplicationList = [{id: "0"}, {id: "1"}];
		subject = new JobApplicationProvider(mockStorage);
	});

	describe('get all job applications', () => {
		it('should return all job applications', () => {
			subject.getAllJobApplications((applications)=>{
				expect(applications).to.deep.equal(mockStorage.JobApplicationList);
			}, ()=>{});
		});
	});
});
