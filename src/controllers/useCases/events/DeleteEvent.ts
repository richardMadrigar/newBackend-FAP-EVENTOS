import { Request, Response } from 'express';

import { pool } from '../../../config/configDataBase/database';

import { logger } from '../../../config/configLogger';

export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const { id_evento } = req.params;

    const SQL = 'DELETE FROM eventos WHERE id_evento = $1';
    const VALUES = id_evento;

    const resultId = await pool.query(SQL, [VALUES]);

    if (!resultId.rowCount) {
      return res.status(400).json(`Usuario com ${id_evento} não existe `);
    }

    logger.info(`Evento com id: ${id_evento} foi deletado `);
    return res.json(`Evento com id: ${id_evento} foi deletado `);
  } catch (error) {
    logger.fatal(error);
    return res.status(500).json('Internal Server error');
  }
};
