import bcrypt from 'bcrypt';

class passwordHasher {
  static hashPassword(password) {
    const hashedPassword = bcrypt.hash(password, 10);
    return hashedPassword;
  }

  static validatePassword(password, encryptedPassword) {
    const returnedPassword = bcrypt.compare(password, encryptedPassword);
    return returnedPassword;
  }
}

export default passwordHasher;
