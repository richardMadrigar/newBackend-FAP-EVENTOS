import { Request, Response } from 'express';
import { pool } from '../../config/configDataBase/database';

import logger from '../../config/configLogger';

export const getUsersAll = async (req: Request, res: Response) => {
  try {
    const { rows } = await pool.query(`
    SELECT * FROM usuarios 
    INNER JOIN img_perfil_usuarios
    ON usuarios.id_usuario=img_perfil_usuarios.id_usuario
    INNER JOIN permissao_usuarios
    ON usuarios.id_usuario=permissao_usuarios.id_usuario`);

    if (!rows) {
      return res.status(400).json('Usuario nao não existe ');
    }

    return res.status(200).json(rows);
  } catch (error) {
    logger.fatal(error);
    return res.status(500).json('Internal Server error');
  }
};
