import bcrypt from 'bcrypt';

export default class passwordHasher {
  static async hashPassword(password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  }

  static async validatePassword(password, encryptedPassword) {
    const returnedPassword = await bcrypt.compare(password, encryptedPassword);
    return returnedPassword;
  }
}
