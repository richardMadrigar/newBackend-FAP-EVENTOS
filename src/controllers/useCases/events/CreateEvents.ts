import { Request, Response } from 'express';

import { v4 as uuidv4 } from 'uuid';
import { pool } from '../../../config/configDataBase/database';
import { logger } from '../../../config/configLogger';

export const CreateEvent = async (req: Request, res: Response) => {
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
    responsavel_evento_nome,
    ativo_evento,
    descricao_evento,
  } = req.body;

  logger.info(req.body);

  if (nome_evento === ''
    || endereco_evento === ''
    || numero_evento === ''
    || bairro_evento === ''
    || cidade_evento === ''
    || estado_evento === ''
    || data_evento === ''
    || inicio_evento === ''
    || termino_evento === ''
    || responsavel_evento_nome === ''
    || ativo_evento === ''
    || descricao_evento === '') {
    return res.status(200).json('Falta de dados para criar evento');
  }

  try {
    const [, responsavel_eventoSplit] = responsavel_evento_nome.split(' + ');

    const { rows } = await pool.query('SELECT id_usuario FROM permissao_usuarios WHERE cpf_usuario =  $1', [responsavel_eventoSplit]);
    const [{ id_usuario }] = rows;

    const id_evento = uuidv4();

    const SQL = `INSERT INTO eventos (
      id_evento,
      nome_evento, endereco_evento, numero_evento, 
      bairro_evento, cidade_evento, estado_evento, data_evento,
      inicio_evento, termino_evento, responsavel_evento, ativo_evento,
      descricao_evento
    )
      VALUES( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
    `;

    const values = [
      id_evento,
      nome_evento, endereco_evento, numero_evento,
      bairro_evento, cidade_evento, estado_evento, data_evento,
      inicio_evento, termino_evento, id_usuario, ativo_evento,
      descricao_evento,
    ];

    await pool.query(SQL, values);
    logger.info('Evento criado com sucesso ');

    return res.status(201).json('Evento criado com sucesso ');
  } catch (error) {
    logger.fatal(error);
    return res.status(500).json('Internal Server error');
  }
};
