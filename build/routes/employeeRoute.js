"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/no-duplicates */
var express_1 = __importDefault(require("express"));
var express_2 = __importDefault(require("express"));
var employeeController_1 = __importDefault(require("../controllers/employeeController"));
var validators_1 = require("../middleware/validators");
var EmployeeRouter = express_1.default.Router();
EmployeeRouter.use((0, express_2.default)());
EmployeeRouter.post('/auth/signup', validators_1.signUpValidator, employeeController_1.default.EmployeeSignUp);
EmployeeRouter.post('/auth/signin', validators_1.logInValidator, employeeController_1.default.EmployeeSignIn);
exports.default = EmployeeRouter;
//# sourceMappingURL=employeeRoute.js.map