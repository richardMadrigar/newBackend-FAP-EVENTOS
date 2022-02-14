import { Request, Response } from 'express';
import { pool } from '../../../config/configDataBase/database';

import { logger } from '../../../config/configLogger';

export const getListEventAll = async (request: Request, response: Response) => {
  const SQL = 'SELECT * FROM eventos ';

  try {
    const { rows } = await pool.query(SQL);

    return response.status(200).json(rows);
  } catch (error) {
    logger.fatal(error);
    return response.status(500).json('Internal Server error');
  }
};
