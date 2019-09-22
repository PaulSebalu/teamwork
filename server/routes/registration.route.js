import express from 'express';
import Employee from '../controllers/employee.controller';

const EmployeeRouter = express.Router();

EmployeeRouter.post('/api/v1/signup', Employee.EmployeeSignUp);

export default EmployeeRouter;
