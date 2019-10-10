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
      (err, results) => {
        if (err) {
          return res.status(400).json({
            status: 400,
            error: err.detail
          });
        }
        const token = Token.createToken({
          employeeId: results.rows[0].id,
          adminAccess: results.rows[0].userType
        });
        return res.status(201).json({
          status: 201,
          message: 'Successfully signed up',
          data: {
            token,
            id: results.rows[0].id,
            firstName: results.rows[0].firstName,
            lastName: results.rows[0].lastName,
            email: results.rows[0].email,
            gender: results.rows[0].gender,
            jobRole: results.rows[0].jobRole,
            department: results.rows[0].department,
            address: results.rows[0].address,
            userType: results.rows[0].usertype
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
      (err, results) => {
        if (err) {
          return res.status(400).json({
            status: 400,
            error: err.detail
          });
        }
        if (results.rows.length === 0) {
          return res.status(400).json({
            status: 400,
            message: 'An employee with this email does not exist'
          });
        }
        if (bcrypt.compareSync(password, results.rows[0].password)) {
          const token = Token.createToken({
            employeeId: results.rows[0].id,
            adminAccess: results.rows[0].userType
          });
          return res
            .header('Authorization', `Bearer ${token}`)
            .status(200)
            .json({
              status: 200,
              message: 'User is successfully logged in',
              data: {
                token,
                id: results.rows[0].id,
                firstName: results.rows[0].firstName,
                lastName: results.rows[0].lastName,
                email: results.rows[0].email,
                gender: results.rows[0].gender,
                jobRole: results.rows[0].jobRole,
                department: results.rows[0].department,
                address: results.rows[0].address,
                userType: results.rows[0].usertype
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