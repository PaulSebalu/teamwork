"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-undef */
var chai_1 = __importDefault(require("chai"));
var chai_http_1 = __importDefault(require("chai-http"));
var app_1 = __importDefault(require("../../../app"));
var expect = chai_1.default.expect;
chai_1.default.use(chai_http_1.default);
describe('Teamwork API root endpoint', function () {
    it('Does the application exist?', function () {
        expect(app_1.default).to.be.a('function');
    });
    it('Root endpoint should return a 200 {Ok} HTTP status code and a success message', function (done) {
        chai_1.default
            .request(app_1.default)
            .get('/')
            .then(function (res) {
            expect(res).to.have.status(200);
            expect(res.body.message).to.be.equal('Teamwork API');
            done();
        })
            .catch(function (err) {
            return err.message;
        });
    });
    it("Endpoints that haven't been explicitly declared should return a 405 {Method Not Allowed} HTTP status code", function (done) {
        chai_1.default
            .request(app_1.default)
            .get('/random/url')
            .end(function (err, res) {
            expect(res.body.status).to.be.equal(405);
            expect(res.body.message).to.be.equal('Invalid URL');
            done();
        });
    });
});
//# sourceMappingURL=appTests.js.map