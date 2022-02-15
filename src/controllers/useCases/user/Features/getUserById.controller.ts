import { Request, Response } from 'express';
import { pool } from '../../../../config/configDataBase/database';
import { logger } from '../../../../config/configLogger';

export const getUserbyId = async (req: Request, res: Response) => {
  try {
    const { id_usuario } = req.params;

    const { rowCount, rows } = await pool.query(`
    SELECT * FROM usuarios
    INNER JOIN img_perfil_usuarios
    ON usuarios.id_usuario=img_perfil_usuarios.id_usuario
    INNER JOIN permissao_usuarios
    ON usuarios.id_usuario=permissao_usuarios.id_usuario
    WHERE usuarios.id_usuario = $1`, [id_usuario]);

    if (!rowCount) {
      return res.status(400).json(`Usuario com ${id_usuario} não existe `);
    }

    const [{
      nome_completo, cpf, email, rg, whats, celular, cep, numero_da_rua, data_nascimento, nit_pis,
      nome_da_mae, banco, agencia, conta, pix, ccm, img_perfil, permissao,
    }] = rows;

    return res.json({
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
      conta,
      cep,
      numero_da_rua,
      pix,
      ccm,
      permissao,
      img_perfil,
    });
  } catch (error) {
    logger.fatal(error);
    return res.status(500).json('Internal Server error');
  }
};
