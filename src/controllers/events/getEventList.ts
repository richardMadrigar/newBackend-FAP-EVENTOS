import { Request, Response } from 'express';
import { pool } from '../../config/configDataBase/database';

import { logger } from '../../config/configLogger';

export const getListEvent = async (request: Request, response: Response) => {
  const { inicial_date, final_date } = request.body;

  const SQL = `SELECT * FROM usuarios 
               WHERE created_at BETWEEN '${inicial_date}' and '${final_date}';`;

  try {
    // const { rows, rowCount } = await pool.query('SELECT * FROM eventos');

    const { rows: eventFilter } = await pool.query(SQL);

    // logger.info(eventFilter);
    return response.status(200).json(eventFilter);
  } catch (error) {
    logger.fatal(error);
    return response.status(500).json('Internal Server error');
  }
};
