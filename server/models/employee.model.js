import passwordHasher from '../helpers/password.hasher.helper';
import employeeDb from './employees.db';

class Employee {
  async createNewEmployee(validatedData) {
    const {
      firstName,
      lastName,
      email,
      password,
      gender,
      jobRole,
      department,
      address
    } = validatedData;

    const newEmployee = {
      id: employeeDb.length + 1,
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: await passwordHasher.hashPassword(password),
      gender: (gender && gender.toUpperCase()) || '',
      jobRole: jobRole || '',
      department: department || '',
      address: address || '',
      userType: 'user'
    };
    employeeDb.push(newEmployee);
    return newEmployee;
  }

  allEmployees() {
    const employees = employeeDb;
    return employees;
  }

  findEmployee(id) {
    const employee = employeeDb.find(e => e.id === id);
    return employee;
  }

  getEmployeebyEmail(email) {
    const employee = employeeDb.find(e => e.email === email.toLowerCase());
    return employee;
  }
}

export default new Employee();
