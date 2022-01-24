import { Request, Response } from 'express';

import { pool } from '../../config/configDataBase/database';

import logger from '../../config/configLogger';

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id_usuario } = req.params;

    const resultId = await pool.query('DELETE FROM usuarios WHERE id_usuario = $1', [id_usuario]);

    if (!resultId.rowCount) {
      return res.status(400).json(`Usuario com ${id_usuario} não existe `);
    }

    logger.info(`Usuario com id: ${id_usuario} foi deletado `);
    return res.json(`Usuario com id: ${id_usuario} foi deletado `);
  } catch (error) {
    logger.fatal(error);
    return res.status(500).json('Internal Server error');
  }
};
