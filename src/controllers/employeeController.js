import bcrypt from 'bcrypt';
import Token from '../helpers/token';
import teamworkModel from '../models/teamworkModel';

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

    const sql = `INSERT INTO employees
      (firstname, lastname, email, password, gender, 
        jobrole, department, address, usertype) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *
    `;

    const { rows } = await teamworkModel.query(
      sql,
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
      res
    );
    if (rows) {
      const token = Token.createToken({
        employeeId: rows[0].id,
        adminAccess: rows[0].userType
      });
      return res.status(201).json({
        status: 201,
        message: 'Successfully signed up',
        data: {
          token,
          id: rows[0].id,
          firstName: rows[0].firstName,
          lastName: rows[0].lastName,
          email: rows[0].email,
          gender: rows[0].gender,
          jobRole: rows[0].jobRole,
          department: rows[0].department,
          address: rows[0].address,
          userType: rows[0].usertype
        }
      });
    }
  }

  // eslint-disable-next-line consistent-return
  static async EmployeeSignIn(req, res) {
    const { email, password } = req.body;

    const sql = 'SELECT * FROM employees WHERE email = $1';

    const { rows } = await teamworkModel.query(sql, [email], res);
    if (rows.length === 0) {
      return res.status(404).json({
        status: 404,
        message: 'An employee with this email does not exist'
      });
    }
    if (bcrypt.compareSync(password, rows[0].password)) {
      const token = Token.createToken({
        employeeId: rows[0].id,
        adminAccess: rows[0].userType
      });
      return res
        .header('Authorization', `Bearer ${token}`)
        .status(200)
        .json({
          status: 200,
          message: 'User is successfully logged in',
          data: {
            token,
            id: rows[0].id,
            firstName: rows[0].firstName,
            lastName: rows[0].lastName,
            email: rows[0].email,
            gender: rows[0].gender,
            jobRole: rows[0].jobRole,
            department: rows[0].department,
            address: rows[0].address,
            userType: rows[0].usertype
          }
        });
    }
    return res.status(400).json({
      status: 400,
      message: 'Invalid password'
    });
  }
}

export default Employee;
