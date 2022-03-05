"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentValidator = exports.updateArticleValidator = exports.createArticleValidator = exports.logInValidator = exports.signUpValidator = void 0;
/* eslint-disable consistent-return */
var joi_1 = __importDefault(require("joi"));
var exceptions_1 = __importDefault(require("./exceptions"));
var signUpValidator = function (req, res, next) {
    var schema = {
        firstName: joi_1.default.string()
            .min(2)
            .max(20)
            .required(),
        lastName: joi_1.default.string()
            .min(2)
            .max(20)
            .required(),
        email: joi_1.default.string()
            .regex(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/im)
            .email()
            .required(),
        password: joi_1.default.string()
            .regex(/^((?=.*[a-z])(?=.*[A-Z]))(?=.*[0-9])(?=.{8,})/)
            .max(25)
            .required()
            .error(function () { return ({
            message: 'Your password should be at least 8 characters, ' +
                'containing one uppercase letter, numeric ' +
                'character and lowercase letter.'
        }); }),
        gender: joi_1.default.string()
            .regex(/[Mm, Ff]{1}$/)
            .min(1)
            .max(1),
        jobRole: joi_1.default.string()
            .min(2)
            .max(35),
        department: joi_1.default.string()
            .min(2)
            .max(35),
        address: joi_1.default.string()
            .min(3)
            .max(35)
    };
    return (0, exceptions_1.default)(joi_1.default.validate(req.body, schema), res, next);
};
exports.signUpValidator = signUpValidator;
var logInValidator = function (req, res, next) {
    var schema = {
        email: joi_1.default.string()
            .email()
            .required(),
        password: joi_1.default.string()
            .min(3)
            .max(255)
            .required()
    };
    return (0, exceptions_1.default)(joi_1.default.validate(req.body, schema), res, next);
};
exports.logInValidator = logInValidator;
var createArticleValidator = function (req, res, next) {
    var schema = {
        title: joi_1.default.string()
            .min(3)
            .max(100)
            .required(),
        article: joi_1.default.string()
            .min(3)
            .required(),
        category: joi_1.default.string().min(3)
    };
    return (0, exceptions_1.default)(joi_1.default.validate(req.body, schema), res, next);
};
exports.createArticleValidator = createArticleValidator;
var updateArticleValidator = function (req, res, next) {
    var schema = {
        title: joi_1.default.string()
            .min(3)
            .max(100),
        article: joi_1.default.string().min(3),
        category: joi_1.default.string().min(3)
    };
    return (0, exceptions_1.default)(joi_1.default.validate(req.body, schema), res, next);
};
exports.updateArticleValidator = updateArticleValidator;
var commentValidator = function (req, res, next) {
    var schema = {
        comment: joi_1.default.string()
            .min(3)
            .required()
    };
    return (0, exceptions_1.default)(joi_1.default.validate(req.body, schema), res, next);
};
exports.commentValidator = commentValidator;
//# sourceMappingURL=validators.js.map