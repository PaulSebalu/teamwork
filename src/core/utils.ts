import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import env from 'dotenv';

export const envConfig = () =>
  env.config({ path: `.env.${process.env.NODE_ENV}` });

envConfig();

export const prisma = new PrismaClient();

export class Token {
  static createToken(payload: string) {
    const token = jwt.sign(payload, process.env.secretkey!);
    return token;
  }

  static verifyToken(token: string) {
    const payload = jwt.verify(token, process.env.secretkey!);
    return payload;
  }
}
