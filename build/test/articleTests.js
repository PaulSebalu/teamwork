"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-undef */
var chai_1 = __importDefault(require("chai"));
var chai_http_1 = __importDefault(require("chai-http"));
var app_1 = __importDefault(require("../../../app"));
var articleMockData_1 = require("./articleMockData");
var expect = chai_1.default.expect;
chai_1.default.use(chai_http_1.default);
var employeeToken;
var articleId;
describe('Article creation endpoint', function () {
    before('Create user', function (done) {
        chai_1.default
            .request(app_1.default)
            .post('/auth/signup')
            .send(articleMockData_1.validSignUp)
            .end(function (error, res) {
            employeeToken = res.body.data.token;
            if (error)
                done(error);
            done();
        });
    });
    it('Endpoint should return a 201 {Created} HTTP ' +
        'status code and confirmation for valid input', function (done) {
        chai_1.default
            .request(app_1.default)
            .post('/articles')
            .set('Authorization', "Bearer ".concat(employeeToken))
            .send(articleMockData_1.newArticle)
            .then(function (res) {
            expect(res).to.have.status(201);
            expect(res.body.message).to.be.equal('Article successfully created');
            expect(res.body.data.title).to.be.equal('Article Title');
            articleId = res.body.data.articleId;
            done();
        });
    });
    it('Enpoint should return a 403 {Forbidden} HTTP status ' +
        'code for unauthenticated access', function (done) {
        chai_1.default
            .request(app_1.default)
            .post('/articles')
            .send(articleMockData_1.newArticle)
            .then(function (res) {
            expect(res).to.have.status(403);
            expect(res.body.message).to.be.equal('Forbidden: Provide a token to proceed');
            done();
        });
    });
});
describe('Article update endpoint', function () {
    it('Endpoint should return a 200 {Ok} HTTP status ' +
        'code and confirmation on article update', function (done) {
        chai_1.default
            .request(app_1.default)
            .patch("/articles/".concat(articleId))
            .set('Authorization', "Bearer ".concat(employeeToken))
            .send(articleMockData_1.updatedArticle)
            .then(function (res) {
            expect(res).to.have.status(200);
            expect(res.body.message).to.be.equal('Article successfully edited');
            expect(res.body.data.title).to.be.equal('Updated Title');
            expect(res.body.data.article).to.be.equal('Updated body');
            done();
        });
    });
    it('Enpoint should return a 403 {Forbidden} HTTP status code ' +
        'for unauthenticated access', function (done) {
        chai_1.default
            .request(app_1.default)
            .patch("/articles/".concat(articleId))
            .send(articleMockData_1.updatedArticle)
            .then(function (res) {
            expect(res).to.have.status(403);
            expect(res.body.message).to.be.equal('Forbidden: Provide a token to proceed');
            done();
        });
    });
});
describe('Single article api endpoint', function () {
    it('Endpoint should return a 200 {Okay} HTTP status code', function (done) {
        chai_1.default
            .request(app_1.default)
            .get("/articles/".concat(articleId))
            .set('Authorization', "Bearer ".concat(employeeToken))
            .then(function (res) {
            expect(res).to.have.status(200);
            expect(res.body.data.title).to.be.equal('Updated Title');
            expect(res.body.data.article).to.be.equal('Updated body');
            done();
        });
    });
});
describe('Comment api endpoint', function () {
    it('Endpoint should return a 201 {Created} HTTP status code and confirmation for valid input', function (done) {
        chai_1.default
            .request(app_1.default)
            .post("/articles/".concat(articleId, "/comments"))
            .set('Authorization', "Bearer ".concat(employeeToken))
            .send(articleMockData_1.newComment)
            .then(function (res) {
            expect(res).to.have.status(201);
            expect(res.body.message).to.be.equal('Comment successfully created');
            expect(res.body.data.comment).to.be.equal('Sample comment');
            done();
        });
    });
});
describe('Article deletion endpoint', function () {
    before('Sign in Employee', function (done) {
        chai_1.default
            .request(app_1.default)
            .post('/auth/signin')
            .send(articleMockData_1.validSignIn)
            .end(function (error, res) {
            employeeToken = res.body.data.token;
            if (error)
                done(error);
            done();
        });
    });
    it('Endpoint should return a 204 {No Content} HTTP ' +
        'status code and confirmation of article deletion', function (done) {
        chai_1.default
            .request(app_1.default)
            .delete("/articles/".concat(articleId))
            .set('Authorization', "Bearer ".concat(employeeToken))
            .then(function (res) {
            expect(res).to.have.status(200);
            expect(res.body.message).to.be.equal('Article successfully deleted');
            done();
        });
    });
});
describe('Feeds api endpoint', function () {
    it('Endpoint should return a 200 {Okay} HTTP status code ' +
        'and a queryset composed of all articles', function (done) {
        chai_1.default
            .request(app_1.default)
            .get('/feeds')
            .set('Authorization', "Bearer ".concat(employeeToken))
            .then(function (res) {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('data');
            expect(res.body).to.have.property('currentPage');
            expect(res.body.data).to.be.a('array');
            done();
        });
    });
});
//# sourceMappingURL=articleTests.js.map