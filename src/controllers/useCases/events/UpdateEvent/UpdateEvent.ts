import { Request, Response } from 'express';
import { pool } from '../../../../config/configDataBase/database';
import { logger } from '../../../../config/configLogger';

export const UpdateEvent = async (req: Request, res: Response): Promise<Response> => {
  const { id_evento } = req.params;

  const {
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
  } = req.body;

  const SQL = `
      UPDATE eventos SET
      nome_evento = $1, endereco_evento = $2,  numero_evento = $3, 
      bairro_evento = $4, cidade_evento = $5, estado_evento = $6,
      data_evento = $7, inicio_evento = $8, termino_evento = $9,
      responsavel_evento = $10, ativo_evento = $11, descricao_evento = $12 
      WHERE id_evento = $13
    `;

  const values = [
    nome_evento, endereco_evento, numero_evento,
    bairro_evento, cidade_evento, estado_evento,
    data_evento, inicio_evento, termino_evento,
    responsavel_evento, ativo_evento, descricao_evento,
    id_evento,
  ];

  try {
    const { rowCount } = await pool.query('SELECT * FROM eventos WHERE id_evento = $1', [id_evento]);

    if (!rowCount) {
      logger.info(`Evento com ${id_evento} não existe`);
      return res.status(400).json(`Evento com ${id_evento} não existe`);
    }

    await pool.query(SQL, values);

    logger.info(`Evento com ${id_evento} foi editado `);
    return res.status(200).json(`Evento com ${id_evento} foi editado `);
  } catch (error) {
    logger.fatal(error);
    return res.status(500).json('Internal Server error');
  }
};
