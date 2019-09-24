import jwt from 'jsonwebtoken';

class Token {
  static createToken(payload) {
    const token = jwt.sign(payload, 'secretkey');
    return token;
  }

  static verifyToken(token) {
    const payload = jwt.verify(token, 'secretkey');
    return payload;
  }
}

export default Token;
