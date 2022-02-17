import nodemailer from 'nodemailer';
import { logger } from '../configLogger';
import 'dotenv/config';

export const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_HOST),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: { rejectUnauthorized: false },
});

transporter.verify((error) => {
  if (error) {
    return logger.fatal(`Error connection Gmail ${error}`);
  }
  return logger.info('Server is connection to - Gmail - success');
});
