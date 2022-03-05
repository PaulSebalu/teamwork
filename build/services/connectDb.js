"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = require("pg");
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// eslint-disable-next-line import/no-mutable-exports
var pool;
if (process.env.NODE_ENV === 'test') {
    pool = new pg_1.Pool({
        connectionString: process.env.DB_TEST
    });
}
else {
    pool = new pg_1.Pool({
        connectionString: process.env.DATABASE_URL
    });
}
exports.default = pool;
//# sourceMappingURL=connectDb.js.map