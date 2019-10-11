/* eslint-disable import/no-duplicates */
import express from 'express';
import json from 'express';
import Employee from '../controllers/employee.controller';

const EmployeeRouter = express.Router();

EmployeeRouter.use(json());

EmployeeRouter.post('/api/v1/signup', Employee.EmployeeSignUp);
EmployeeRouter.post('/api/v1/signin', Employee.EmployeeSignIn);

export default EmployeeRouter;
