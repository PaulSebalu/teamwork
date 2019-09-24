/* eslint-disable consistent-return */
import Token from '../helpers/token.helper';
import employeeModel from '../models/employee.model';

const verifyUser = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).json({
      status: 403,
      message: 'Forbidden: Provide a token to proceed'
    });
  }
  const bearerHeader = req.headers.authorization.split(' ')[1];
  try {
    const decodedToken = Token.verifyToken(bearerHeader, 'secretkey');
    req.user = employeeModel.findEmployee(decodedToken.employeeId);
    next();
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.message
    });
  }
};

export default verifyUser;
