import { Request, Response } from 'express';
import { pool } from '../../../../config/configDataBase/database';

import { logger } from '../../../../config/configLogger';

export const getListEventSpecification = async (request: Request, response: Response) => {
  const { inicial_date, final_date, nome_evento } = request.body;

  const tes = `SELECT * FROM eventos 
                WHERE data_evento BETWEEN '${inicial_date}' and '${final_date}'
                and nome_evento ILIKE '%${nome_evento}%';`;

  try {
    const { rows } = await pool.query(tes);

    return response.status(200).json(rows);
  } catch (error) {
    logger.fatal(error);
    return response.status(500).json('Internal Server error');
  }
};
