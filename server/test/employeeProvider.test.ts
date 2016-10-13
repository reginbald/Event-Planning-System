/// <reference path="../../typings/mocha/mocha.d.ts" />
import * as express from "express";
import {EmployeeProvider} from '../provider/employeeProvider';
import {MockStorageManager} from './mockStorage';



describe('EmployeeProvider', () => {
    var subject : EmployeeProvider;
    var mockStorage: MockStorageManager;

    beforeEach(function () {
        this.mockStorage = new MockStorageManager();
        this.subject = new EmployeeProvider(mockStorage);
    });

    describe('get all employees', () => {
        it('should return an empty list ', () => {
            var result : any = subject.getAllEmployees(new mockRequest(), {});
            if (result !== []) {
                throw new Error('Expected [] but was ' + result);
            }
        });
    });
});
