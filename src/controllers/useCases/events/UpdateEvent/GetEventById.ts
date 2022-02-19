import { Request, Response } from 'express';
import { pool } from '../../../../config/configDataBase/database';
import { logger } from '../../../../config/configLogger';

export const getEventById = async (req: Request, res: Response) => {
  try {
    const { id_evento } = req.params;

    const { rowCount, rows } = await pool.query('SELECT * FROM eventos WHERE id_evento = $1', [id_evento]);

    if (!rowCount) {
      return res.status(400).json(`Usuario com ${id_evento} não existe `);
    }

    const [{
      nome_evento, endereco_evento, numero_evento,
      bairro_evento, cidade_evento, estado_evento,
      data_evento, inicio_evento, termino_evento,
      responsavel_evento, ativo_evento, descricao_evento,
    }] = rows;

    return res.json({
      nome_evento,
      endereco_evento,
      numero_evento,
      bairro_evento,
      cidade_evento,
      estado_evento,
      data_evento,
      inicio_evento,
      termino_evento,
      responsavel_evento,
      ativo_evento,
      descricao_evento,
      id_evento,
    });
  } catch (error) {
    logger.fatal(error);
    return res.status(500).json('Internal Server error');
  }
};
