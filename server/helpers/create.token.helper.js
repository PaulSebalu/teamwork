import jwt from 'jsonwebtoken';

const createToken = user => {
  const token = jwt.sign(user, 'secretkey');
  return token;
};

export default createToken;
