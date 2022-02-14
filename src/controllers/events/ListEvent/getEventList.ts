import { Request, Response } from 'express';
import { pool } from '../../../config/configDataBase/database';

import { logger } from '../../../config/configLogger';

export const getListEvent = async (request: Request, response: Response) => {
  const { inicial_date, final_date } = request.body;

  const SQL = `SELECT * FROM eventos 
               WHERE data_evento BETWEEN '${inicial_date}' and '${final_date}';`;

  try {
    const { rows } = await pool.query(SQL);

    return response.status(200).json(rows);
  } catch (error) {
    logger.fatal(error);
    return response.status(500).json('Internal Server error');
  }
};
