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

    const { rows: ns } = await pool.query('SELECT nome_completo, cpf_usuario FROM permissao_usuarios WHERE id_usuario =  $1', [responsavel_evento]);
    const result = ns.map((value) => ({
      responsavel_evento: `${value.nome_completo}  +  ${value.cpf_usuario}`,
    }));
    const resultt = result.map((user) => user.responsavel_evento);

    const date = new Date(data_evento);
    const restulDateFormat = new Intl.DateTimeFormat('fr-ca', { dateStyle: 'short' }).format(date);

    // const myArray = [{ id: 1, name: 'John' }, { id: 2, name: 'Rick' }, { id: 3, name: 'Anna' }];
    // myArray.splice(0, 1);
    // console.log(myArray);

    return res.json({
      nome_evento,
      endereco_evento,
      numero_evento,
      bairro_evento,
      cidade_evento,
      estado_evento,
      data_evento: restulDateFormat,
      inicio_evento,
      termino_evento,
      responsavel_evento: resultt[0],
      ativo_evento,
      descricao_evento,
      id_evento,
    });
  } catch (error) {
    logger.fatal(error);
    return res.status(500).json('Internal Server error');
  }
};
