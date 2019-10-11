/* eslint-disable import/no-duplicates */
import express from 'express';
import json from 'express';
import Employee from '../controllers/employeeController';
import { signUpValidator, logInValidator } from '../middleware/validators';

const EmployeeRouter = express.Router();

EmployeeRouter.use(json());

EmployeeRouter.post('/api/v2/signup', signUpValidator, Employee.EmployeeSignUp);
EmployeeRouter.post('/api/v2/signin', logInValidator, Employee.EmployeeSignIn);

export default EmployeeRouter;
