import employeeModel from '../models/employee.model';
import employees from '../models/employees.db';
import signUpFields from '../helpers/employee.validator.helper';
import createToken from '../helpers/create.token.helper';

class Employee {
  static async EmployeeSignUp(req, res) {
    const { error } = signUpFields(req.body);

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

    const returnedResponse = {
      status: 201,
      message: 'Successfully signed up',
      token,
      newEmployee
    };
    return res.status(201).json(returnedResponse);
  }
}

export default Employee;
