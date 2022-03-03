"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.get('/', (req, res) => {
    res.send({
        status: 200,
        message: 'Teamwork API'
    });
});
app.use('*', (req, res) => {
    return res.status(405).json({
        status: 405,
        message: 'Invalid resource'
    });
});
let PORT;
if (process.env.NODE_ENV === 'test') {
    PORT = 3000;
}
else {
    PORT = process.env.PORT || 2000;
}
app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server started on port ${PORT}...`);
});
module.exports = app;
//# sourceMappingURL=index.js.map