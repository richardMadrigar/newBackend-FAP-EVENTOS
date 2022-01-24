import { Request, Response, NextFunction } from 'express';

import jwt from 'jsonwebtoken';
import 'dotenv/config';

import logger from '../config/configLogger';

const SECRET = String(process.env.SECRET_TOKEN);

interface TokenInterface {
  cpf: string;
}

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const authToken = req.headers.authorization;

  try {
    if (!authToken) return res.status(401).json({ message: 'Token obrigatório' });

    const [, token] = authToken.split(' ');

    return jwt.verify(token, SECRET, (err, decoded) => {
      if (err) return res.status(401).json({ message: 'Token obrigatório' });

      const decodedToken = decoded as TokenInterface;
      req.body.cpfToken = decodedToken.cpf;

      return next();
    });
  } catch (error) {
    logger.fatal(error);
    return res.status(401).json(error);
  }
};
