import { Request, Response } from 'express';

import { v4 as uuidv4 } from 'uuid';
import { pool } from '../../config/configDataBase/database';
import { logger } from '../../config/configLogger';

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
    responsavel_evento,
    ativo_evento,
    descricao_evento,
  } = req.body;
  console.log(req.body);
  try {
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
      inicio_evento, termino_evento, responsavel_evento, ativo_evento,
      descricao_evento,
    ];

    await pool.query(SQL, values);

    // const { rows } = await pool.query(`
    //     SELECT * FROM usuarios
    //     INNER JOIN img_perfil_usuarios
    //     ON usuarios.id_usuario=img_perfil_usuarios.id_usuario
    //     INNER JOIN permissao_usuarios
    //     ON usuarios.id_usuario=permissao_usuarios.id_usuario
    //     WHERE cpf = $1`, [cpf]);

    // const [{ permissao, img_perfil }] = rows;

    logger.info('Evento criado com sucesso ');

    return res.status(201).json({ message: 'Evento criado com sucesso ' });
  } catch (error) {
    logger.fatal(error);
    return res.status(500).json('Internal Server error');
  }
};
