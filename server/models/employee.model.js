import passwordHasher from '../helpers/password.hasher.helper';
import employeeDb from './employees.db';

class Employee {
  async newEmployee(req) {
    const {
      firstName,
      lastName,
      email,
      password,
      gender,
      jobRole,
      department,
      address
    } = req;

    const hashedPassword = await passwordHasher.hashPassword(password);

    const newEmployee = {
      firstName,
      lastName,
      email: email.toLowerCase(),
      hashedPassword,
      gender: gender.toUpperCase(),
      jobRole,
      department,
      address,
      admin: false
    };

    const createNewEmployee = {
      id: employeeDb.length + 1,
      firstName: newEmployee.firstName,
      lastName: newEmployee.lastName,
      email: newEmployee.email,
      password: newEmployee.hashedPassword,
      gender: newEmployee.gender,
      jobRole: newEmployee.jobRole,
      department: newEmployee.department,
      address: newEmployee.address,
      admin: newEmployee.admin
    };
    employeeDb.push(createNewEmployee);
    return createNewEmployee;
  }

  async allEmployees() {
    const employees = employeeDb;
    return employees;
  }

  async findEmployee(id) {
    const primarykey = parseInt(id, 10);
    employeeDb.map(employee => {
      if (employee.id === primarykey) {
        return employee;
      }
      return Error(`An employee with the unique ID: ${id} does not exist`);
    });
  }
}

export default new Employee();
