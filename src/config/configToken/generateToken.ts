import jwt from 'jsonwebtoken';

import 'dotenv/config';

export const generateToken = (cpf: string) => jwt.sign(
  { cpf },
  String(process.env.SECRET_TOKEN),
  { expiresIn: (60 * 60 * 24) }, // 60s * 60m * 24h
);
