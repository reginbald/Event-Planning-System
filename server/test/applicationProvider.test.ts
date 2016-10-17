/// <reference path="../../typings/mocha/mocha.d.ts" />
/// <reference path="../../typings/chai/chai.d.ts" />
import { expect } from 'chai';

import {ApplicationProvider} from "../provider/applicationProvider";
import {MockStorageManager} from "./mock/mockStorage";
import {NewApplicationViewModel} from "../viewModels/newApplicationViewModel";

describe('ApplicationProvider', () => {
	var mockStorage: MockStorageManager;
	var subject: ApplicationProvider;

	beforeEach(function() {
		mockStorage = new MockStorageManager();
		mockStorage.ApplicationList = [{id: "0", eventid: "0"}, {id: "1", eventid: "1"}];
		subject = new ApplicationProvider(mockStorage);
	});

	describe('getAllApplications function', () => {
		it('should return all applications', () => {
			subject.getAllApplications((applications)=>{
				expect(applications).to.deep.equal(mockStorage.ApplicationList);
			}, ()=>{});
		});
	});
	describe('createApplication function', () => {
		it('should return the newly created application', () => {
			let newApplication = new NewApplicationViewModel(1,2);
			subject.createApplication(newApplication, (application)=>{
							expect(application).to.deep.equal(newApplication);
			}, ()=>{});
		});
	});
});
