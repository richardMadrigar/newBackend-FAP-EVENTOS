import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { pool } from '../../../../config/configDataBase/database';
import { logger } from '../../../../config/configLogger';

const salt = bcrypt.genSaltSync(10);

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { id_usuario } = req.params;

    const { rowCount } = await pool.query('SELECT id_usuario FROM usuarios WHERE id_usuario = $1', [id_usuario]);

    if (!rowCount) {
      return res.status(400).json(`Usuario com ${id_usuario} não existe `);
    }

    const newPassword = Math.random().toString(36).slice(-10);

    const hash = bcrypt.hashSync(newPassword, salt);

    await pool.query('UPDATE usuarios SET senha = $1', [hash]);

    logger.info(`Usuario com id: ${id_usuario} foi resetado com sucesso`);
    return res.status(200).json({
      message: `Senha do usuário com id: ${id_usuario} foi editado com sucesso`, newPassword,
    });
  } catch (error) {
    logger.fatal(error);
    return res.status(500).json('Internal Server error');
  }
};
