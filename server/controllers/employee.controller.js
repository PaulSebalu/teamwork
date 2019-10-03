import employeeModel from '../models/employee.model';
import {
  signUpValidator,
  logInValidator
} from '../helpers/employee.validator.helper';
import Token from '../helpers/token.helper';
import passwordHasher from '../helpers/password.hasher.helper';
import exceptionHandler from '../helpers/exception.helper';

class Employee {
  static async EmployeeSignUp(req, res) {
    const { error } = signUpValidator(req.body);
    if (error) {
      return exceptionHandler(res, error);
    }

    if (employeeModel.getEmployeebyEmail(req.body.email) !== undefined) {
      return res
        .status(409)
        .json({ status: 409, message: 'Email already taken!' });
    }
    const newEmployee = await employeeModel.createNewEmployee(req.body);

    const token = Token.createToken({
      employeeId: newEmployee.id,
      adminAccess: newEmployee.userType
    });
    return res.status(201).json({
      status: 201,
      message: 'Successfully signed up',
      data: {
        token,
        id: newEmployee.id || '',
        firstName: newEmployee.firstName || '',
        lastName: newEmployee.lastName || '',
        email: newEmployee.email || '',
        gender: newEmployee.gender || '',
        jobRole: newEmployee.jobRole || '',
        department: newEmployee.department || '',
        address: newEmployee.address || '',
        userType: newEmployee.userType || ''
      }
    });
  }

  static async EmployeeSignIn(req, res) {
    const { error } = logInValidator(req.body);

    if (error) {
      return exceptionHandler(res, error);
    }

    const { email, password } = req.body;

    const employee = employeeModel.getEmployeebyEmail(email);
    if (employee === undefined) {
      return res.status(404).json({
        status: 404,
        message: 'An employee with this email does not exist'
      });
    }

    const passwordValidator = await passwordHasher.validatePassword(
      password,
      employee.password
    );

    if (!passwordValidator) {
      return res.status(401).json({
        status: 401,
        error: 'Invalid Password'
      });
    }

    const token = Token.createToken({
      employeeId: employee.id,
      adminAccess: employee.userType
    });
    return res
      .header('Authorization', `Bearer ${token}`)
      .status(200)
      .json({
        status: 200,
        message: 'User is successfully logged in',
        data: {
          token,
          firstName: employee.firstName || '',
          lastName: employee.lastName || '',
          email: employee.email || '',
          gender: employee.gender || '',
          jobRole: employee.jobRole || '',
          department: employee.department || '',
          address: employee.address || '',
          userType: employee.userType || ''
        }
      });
  }
}

export default Employee;
