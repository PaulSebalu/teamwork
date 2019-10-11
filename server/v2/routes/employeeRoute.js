/* eslint-disable import/no-duplicates */
import express from 'express';
import json from 'express';
import Employee from '../controllers/employeeController';
import { signUpValidator, logInValidator } from '../middleware/validators';

const EmployeeRouter = express.Router();

EmployeeRouter.use(json());

EmployeeRouter.post('/auth/signup', signUpValidator, Employee.EmployeeSignUp);
EmployeeRouter.post('/auth/signin', logInValidator, Employee.EmployeeSignIn);

export default EmployeeRouter;
