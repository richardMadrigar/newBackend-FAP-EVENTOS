import jwt from 'jsonwebtoken';

import 'dotenv/config';

export const generateToken = (cpf: string) => jwt.sign(
  { cpf },
  String(process.env.SECRET_TOKEN),
  { expiresIn: (60 * 40) },
);
