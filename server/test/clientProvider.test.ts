/// <reference path="../../typings/mocha/mocha.d.ts" />
/// <reference path="../../typings/chai/chai.d.ts" />
import { expect } from 'chai';

import {ClientProvider} from "../provider/clientProvider";
import {MockStorageManager} from "./mock/mockStorage";
import {NewClientViewModel} from "../viewModels/newClientViewModel";

describe('ClientProvider', () => {
	var mockStorage: MockStorageManager;
	var subject: ClientProvider;
	var result: any;

	beforeEach(function() {
		mockStorage = new MockStorageManager();
		mockStorage.ClientList = [{name: "name1"}, {name: "name2"}]
		subject = new ClientProvider(mockStorage);
	});

	describe('getAllClients function', () => {
		it('should return all clients', () => {
			subject.getAllClients((clients) => {
				expect(clients).to.deep.equal(mockStorage.ClientList);
			}, () => {});
		});
	});
	describe('createClient function', () => {
		it('should return new client details', () => {
			let newClient = new NewClientViewModel("name", "email@email.com");
			subject.createClient(newClient, (client) => {
				expect(client).to.deep.equal(newClient);
			}, () => {});
		});
		it('should return DB_ERROR when database fails', () => {
			this.dbERROR = true;
			let newClient = new NewClientViewModel("name", "email@email.com");
			subject.createClient(newClient, () => {}, (error)=>{
				expect(error).to.deep.equal("DB_ERROR");
			});
		});
	});
});
