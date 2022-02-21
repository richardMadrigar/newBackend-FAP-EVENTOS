import { Request, Response } from 'express';

import { pool } from '../../../config/configDataBase/database';
import { logger } from '../../../config/configLogger';

export const getGerenteByName = async (req: Request, res: Response) => {
  const { responsavel_evento } = req.params;

  try {
    const SQL = `SELECT nome_completo, id_usuario, cpf_usuario FROM permissao_usuarios 
                  WHERE
                  nome_completo ILIKE '%${responsavel_evento}%' 
                    AND 
                  permissao = 'gestor'`;

    const { rows, rowCount } = await pool.query(SQL);

    if (!rowCount) {
      return res.status(200).json([{ label: '', id_usuario: '' }]);
    }

    const result = rows.map((value) => ({
      label: `${value.nome_completo}  +  ${value.cpf_usuario}`,
    }));

    return res.status(200).json(result);
  } catch (error) {
    logger.fatal(error);
    return res.status(500).json('Internal Server error');
  }
};
