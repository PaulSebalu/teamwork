/* eslint-disable consistent-return */
import Token from '../helpers/token';
import pool from '../services/connectDb';

const tokenProvided = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).json({
      status: 403,
      message: 'Forbidden: Provide a token to proceed'
    });
  }
  next();
};

const verifyUser = (req, res, next) => {
  const bearerHeader = req.headers.authorization.split(' ')[1];
  const decodedToken = Token.verifyToken(bearerHeader, 'secretkey');

  pool.query(
    'SELECT * FROM employees WHERE id = $1',
    [decodedToken.employeeId],
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
          message: 'Invalid token'
        });
      }
      // eslint-disable-next-line prefer-destructuring
      req.user = results.rows[0];
      next();
    }
  );
};

export { tokenProvided, verifyUser };
