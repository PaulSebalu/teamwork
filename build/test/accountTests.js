"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-undef */
var chai_1 = __importDefault(require("chai"));
var chai_http_1 = __importDefault(require("chai-http"));
var app_1 = __importDefault(require("../../../app"));
var accountMockData_1 = require("./accountMockData");
var expect = chai_1.default.expect;
chai_1.default.use(chai_http_1.default);
describe('User registration endpoint', function () {
    it('Endpoint should return a 201 {Created} HTTP' +
        'status code and confirmation for valid input', function (done) {
        chai_1.default
            .request(app_1.default)
            .post('/api/v1/signup')
            .send(accountMockData_1.validSignUp)
            .then(function (res) {
            expect(res).to.have.status(201);
            expect(res.body.message).to.be.equal('Successfully signed up');
            done();
        });
    });
    it('Enpoint should return a 400 {Bad request}' +
        'HTTP status code for invalid password', function (done) {
        chai_1.default
            .request(app_1.default)
            .post('/api/v1/signup')
            .send(accountMockData_1.invalidSignUp)
            .then(function (res) {
            expect(res).to.have.status(400);
            expect(res.body.error).to.be.equal('Your password should be at least 8 characters, ' +
                'containing one uppercase letter, numeric ' +
                'character and lowercase letter.');
            done();
        });
    });
});
describe('User authentication and authorization enpoint', function () {
    beforeEach('Sign up user', function (done) {
        chai_1.default
            .request(app_1.default)
            .post('/api/v1/signup')
            .send(accountMockData_1.SignUp)
            .end(function (error) {
            if (error)
                done(error);
            done();
        });
    });
    it('Endpoint should return a 200 {Ok}' +
        'HTTP status code and login confirmation ' +
        'for an existing user wih valid input', function (done) {
        chai_1.default
            .request(app_1.default)
            .post('/api/v1/signin')
            .send(accountMockData_1.SignIn)
            .then(function (res) {
            expect(res).to.have.status(200);
            expect(res.body.message).to.be.equal('User is successfully logged in');
            expect(res.body.data).to.have.property('token');
            done();
        });
    });
    it('Endpoint should return a 401 {Unauthorized}' +
        'HTTP status code for an invalid password', function (done) {
        chai_1.default
            .request(app_1.default)
            .post('/api/v1/signin')
            .send(accountMockData_1.SignInWithWrongPassword)
            .then(function (res) {
            expect(res).to.have.status(401);
            expect(res.body.error).to.be.equal('Invalid Password');
            done();
        });
    });
    it('Enpoint should return a 404 {Not Found}' +
        'HTTP status code for an invalid email', function (done) {
        chai_1.default
            .request(app_1.default)
            .post('/api/v1/signin')
            .send(accountMockData_1.SignInWithUnregisteredEmail)
            .then(function (res) {
            expect(res).to.have.status(404);
            expect(res.body.message).to.be.equal('An employee with this email does not exist');
            done();
        });
    });
});
//# sourceMappingURL=accountTests.js.map