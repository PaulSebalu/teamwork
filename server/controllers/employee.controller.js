import employeeModel from '../models/employee.model';
import employees from '../models/employees.db';
import {
  signUpValidator,
  logInValidator
} from '../helpers/employee.validator.helper';
import createToken from '../helpers/create.token.helper';
import passwordHasher from '../helpers/password.hasher.helper';

class Employee {
  static async EmployeeSignUp(req, res) {
    const { error } = signUpValidator(req.body);

    if (error)
      return res.status(422).json({
        status: 422,
        error: error.details[0].message
      });

    const employee = employees.find(
      e => e.email === req.body.email.toLowerCase()
    );
    if (employee !== undefined) {
      return res.status(409).json({
        status: 409,
        message: 'Email already taken!'
      });
    }

    const newEmployee = await employeeModel.newEmployee(req.body);

    const token = createToken(req.body.email);

    const returnResponse = {
      status: 201,
      message: 'Successfully signed up',
      token,
      newEmployee
    };
    return res.status(201).json(returnResponse);
  }

  static async EmployeeSignIn(req, res) {
    const { error } = logInValidator(req.body);

    if (error)
      return res.status(422).json({
        status: 422,
        error: error.details[0].message
      });

    const { email, password } = req.body;

    const employee = employees.find(e => e.email === email.toLowerCase());
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

    const token = createToken(employee.id);

    const returnResponse = {
      status: 200,
      message: 'User is successfully logged in',
      data: [
        {
          token
        }
      ]
    };
    return res
      .header('Authorization', `Bearer ${token}`)
      .status(200)
      .json(returnResponse);
  }
}

export default Employee;
