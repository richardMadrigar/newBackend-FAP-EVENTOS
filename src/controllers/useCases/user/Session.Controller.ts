import { Request, Response } from 'express';
import { pool } from '../../../config/configDataBase/database';
import { logger } from '../../../config/configLogger';

export const sessionUser = async (req: Request, res: Response) => {
  const cpf = req.body.cpfToken;

  try {
    const { rows, rowCount } = await pool.query(`
    SELECT * FROM usuarios
    INNER JOIN img_perfil_usuarios
    ON usuarios.id_usuario=img_perfil_usuarios.id_usuario
    INNER JOIN permissao_usuarios
    ON usuarios.id_usuario=permissao_usuarios.id_usuario
    WHERE cpf = $1`, [cpf]);

    if (!rowCount) {
      return res.status(401).json('usuario nao encontrado');
    }

    const [{
      nome_completo, email, rg, whats, celular, id_usuario, data_nascimento, nit_pis,
      nome_da_mae, banco, agencia, conta, cep, numero_da_rua, pix, img_perfil, permissao,
      ccm, funcao,
    }] = rows;

    logger.info(`Session {nome: ${nome_completo}}, {cpf: ${cpf}}`);

    return res.status(200).json({
      id_usuario,
      nome_completo,
      email,
      cpf,
      rg,
      whats,
      celular,
      data_nascimento,
      nit_pis,
      nome_da_mae,
      banco,
      agencia,
      funcao,
      conta,
      cep,
      numero_da_rua,
      pix,
      ccm,
      img_perfil,
      permissao,
    });
  } catch (error) {
    logger.fatal(error);
    return res.status(401).json(error);
  }
};
