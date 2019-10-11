import bcrypt from 'bcrypt';
import Token from '../helpers/token';
import pool from '../services/connectDb';

class Employee {
  // eslint-disable-next-line consistent-return
  static async EmployeeSignUp(req, res) {
    const {
      firstName,
      lastName,
      email,
      password,
      gender,
      jobRole,
      department,
      address
    } = req.body;

    const query = `INSERT INTO employees
      (firstname, lastname, email, password, gender, 
        jobrole, department, address, usertype) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *
    `;
    pool.query(
      query,
      [
        firstName,
        lastName,
        email.toLowerCase(),
        await bcrypt.hash(password, 10),
        (gender && gender.toUpperCase()) || '',
        jobRole || '',
        department || '',
        address || '',
        'user'
      ],
      (err, employees) => {
        if (err) {
          return res.status(400).json({
            status: 400,
            error: err.detail
          });
        }
        const token = Token.createToken({
          employeeId: employees.rows[0].id,
          adminAccess: employees.rows[0].userType
        });
        return res.status(201).json({
          status: 201,
          message: 'Successfully signed up',
          data: {
            token,
            id: employees.rows[0].id,
            firstName: employees.rows[0].firstName,
            lastName: employees.rows[0].lastName,
            email: employees.rows[0].email,
            gender: employees.rows[0].gender,
            jobRole: employees.rows[0].jobRole,
            department: employees.rows[0].department,
            address: employees.rows[0].address,
            userType: employees.rows[0].usertype
          }
        });
      }
    );
  }

  // eslint-disable-next-line consistent-return
  static async EmployeeSignIn(req, res) {
    const { email, password } = req.body;

    pool.query(
      'SELECT * FROM employees WHERE email = $1',
      [email],
      (err, employees) => {
        if (err) {
          return res.status(400).json({
            status: 400,
            error: err.detail
          });
        }
        if (employees.rows.length === 0) {
          return res.status(404).json({
            status: 404,
            message: 'An employee with this email does not exist'
          });
        }
        if (bcrypt.compareSync(password, employees.rows[0].password)) {
          const token = Token.createToken({
            employeeId: employees.rows[0].id,
            adminAccess: employees.rows[0].userType
          });
          return res
            .header('Authorization', `Bearer ${token}`)
            .status(200)
            .json({
              status: 200,
              message: 'User is successfully logged in',
              data: {
                token,
                id: employees.rows[0].id,
                firstName: employees.rows[0].firstName,
                lastName: employees.rows[0].lastName,
                email: employees.rows[0].email,
                gender: employees.rows[0].gender,
                jobRole: employees.rows[0].jobRole,
                department: employees.rows[0].department,
                address: employees.rows[0].address,
                userType: employees.rows[0].usertype
              }
            });
        }
        return res.status(400).json({
          status: 400,
          message: 'Invalid password'
        });
      }
    );
  }
}

export default Employee;
