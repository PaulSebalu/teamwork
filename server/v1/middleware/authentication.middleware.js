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
    const decodedToken = Token.verifyToken(bearerHeader, process.env.secretkey);
    req.user = employeeModel.findEmployee(decodedToken.employeeId);
    if (req.user === undefined) {
      return res.status(401).json({
        status: 401,
        message: `The server was not able to process the request due to an invalid token`
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.message
    });
  }
};

export default verifyUser;
