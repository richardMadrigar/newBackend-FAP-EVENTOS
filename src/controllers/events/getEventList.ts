import { Request, Response } from 'express';
import { pool } from '../../config/configDataBase/database';

import { logger } from '../../config/configLogger';

export const getListEvent = async (req: Request, res: Response) => {
  try {
    const { rows, rowCount } = await pool.query('SELECT * FROM eventos');

    if (!rowCount) return res.status(400).json('Evento nao  existe ');

    return res.status(200).json(rows);
  } catch (error) {
    logger.fatal(error);
    return res.status(500).json('Internal Server error');
  }
};
