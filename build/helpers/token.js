"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var Token = /** @class */ (function () {
    function Token() {
    }
    Token.createToken = function (payload) {
        var token = jsonwebtoken_1.default.sign(payload, process.env.secretkey);
        return token;
    };
    Token.verifyToken = function (token) {
        var payload = jsonwebtoken_1.default.verify(token, process.env.secretkey);
        return payload;
    };
    return Token;
}());
exports.default = Token;
//# sourceMappingURL=token.js.map