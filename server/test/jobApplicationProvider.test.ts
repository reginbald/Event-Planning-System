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

	describe('getAllJobApplications function', () => {
		it('should return all job applications', () => {
			subject.getAllJobApplications((applications)=>{
				expect(applications).to.deep.equal(mockStorage.JobApplicationList);
			}, ()=>{});
		});
	});
	describe('createJobApplication function', () => {
		it('should return newly created job application', () => {
			let newJobApp = {id: "3"};
			subject.createJobApplication(newJobApp, (application)=>{
				expect(application).to.deep.equal(newJobApp);
			}, ()=>{});
		});
	});
});
