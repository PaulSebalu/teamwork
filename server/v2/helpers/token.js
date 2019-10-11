import jwt from 'jsonwebtoken';

class Token {
  static createToken(payload) {
    const token = jwt.sign(payload, process.env.secretkey);
    return token;
  }

  static verifyToken(token) {
    const payload = jwt.verify(token, process.env.secretkey);
    return payload;
  }
}

export default Token;
