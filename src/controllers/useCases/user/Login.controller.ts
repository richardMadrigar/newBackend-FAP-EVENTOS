import { Request, Response } from 'express';

import bcrypt from 'bcrypt';
import { pool } from '../../../config/configDataBase/database';
import { logger } from '../../../config/configLogger';
import { generateToken } from '../../../config/configToken/generateToken';

export const Login = async (req: Request, res: Response) => {
  const { cpf, senha: senhaFront } = req.body;

  try {
    const sql = 'SELECT cpf FROM usuarios WHERE cpf = $1';
    const values = [cpf];

    const { rowCount } = await pool.query(sql, values);

    if (!rowCount) {
      return res.status(401).json('Cpf/Senha incorreto');
    }

    const { rows } = await pool.query(`
        SELECT * FROM usuarios
        INNER JOIN img_perfil_usuarios
        ON usuarios.id_usuario=img_perfil_usuarios.id_usuario
        INNER JOIN permissao_usuarios
        ON usuarios.id_usuario=permissao_usuarios.id_usuario
        WHERE cpf = $1`, [cpf]);

    const [{
      id_usuario, nome_completo, email, rg, whats, celular, data_nascimento, nit_pis,
      nome_da_mae, banco, agencia, conta, cep, numero_da_rua, pix, ccm, senha,
      permissao, img_perfil, funcao,
    }] = rows;

    const confere = await bcrypt.compare(senhaFront, senha);

    if (!confere) {
      return res.status(401).json('Usuário/Senha não encontrado');
    }

    const token = generateToken(cpf);

    logger.info(`Usuario logado com CPF: ${cpf}`);
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
      conta,
      cep,
      funcao,
      numero_da_rua,
      pix,
      ccm,
      permissao,
      img_perfil,
      token,
    });
  } catch (error) {
    logger.fatal(error);
    return res.status(500).json('Internal Server error');
  }
};
