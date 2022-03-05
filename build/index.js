"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var express_1 = __importDefault(require("express"));
dotenv_1.default.config();
var app = (0, express_1.default)();
app.get('/', function (req, res) {
    res.send({
        status: 200,
        message: 'Teamwork REST API'
    });
});
app.use('*', function (req, res) {
    return res.status(405).json({
        status: 405,
        message: 'Invalid resource'
    });
});
var PORT;
if (process.env.NODE_ENV === 'test') {
    PORT = 3000;
}
else {
    PORT = process.env.PORT || 2000;
}
app.listen(PORT, function () {
    // eslint-disable-next-line no-console
    console.log("Server started on port ".concat(PORT, "..."));
});
module.exports = app;
//# sourceMappingURL=index.js.map