import { Request, Response } from 'express';

import bcrypt from 'bcrypt';

import { prisma, envConfig } from '../core/utils';

envConfig();

export const signUp = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.create({
      data: { email, password: await bcrypt.hash(password, 10) }
    });

    return res.status(201).json(user);
  } catch (error) {
    return res.status(500);
  }
};

export const logIn = undefined;
