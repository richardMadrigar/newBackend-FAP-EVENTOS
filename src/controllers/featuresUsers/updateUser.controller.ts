import { Request, Response } from 'express';
import { pool } from '../../config/configDataBase/database';
import { logger } from '../../config/configLogger';

export const updateUser = async (req: Request, res: Response): Promise<Response> => {
  const { id_usuario } = req.params;

  const {
    nome_completo, email, cpf, rg, whats, celular, data_nascimento, nit_pis,
    nome_da_mae, banco, agencia, conta, cep, numero_da_rua, pix, ccm,

  } = req.body;

  const SQL = `
      UPDATE usuarios SET
      nome_completo = $1, email = $2,  cpf = $3,  rg = $4, whats = $5, 
      celular = $6, data_nascimento = $7, nit_pis = $8, nome_da_mae = $9,
      banco = $10, agencia = $11, conta = $12, cep = $13, numero_da_rua = $14,
      pix = $15, ccm = $16
      WHERE id_usuario = $17
    `;

  const values = [
    nome_completo, email, cpf, rg, whats, celular, data_nascimento, nit_pis,
    nome_da_mae, banco, agencia, conta, cep, pix, numero_da_rua, ccm, id_usuario,
  ];

  try {
    if (cpf.length !== 11) {
      return res.status(400).send({ error: 'CPF deve conter 11 digitos' });
    }

    const { rowCount } = await pool.query('SELECT * FROM usuarios WHERE id_usuario = $1', [id_usuario]);

    if (!rowCount) {
      logger.info(`Usuario com ${id_usuario} não existe`);
      return res.status(400).json(`Usuario com ${id_usuario} não existe`);
    }

    await pool.query(SQL, values);

    logger.info(`Usuario com ${id_usuario} foi editado `);
    return res.status(200).json(`Usuário com ${id_usuario} foi editado `);
  } catch (error) {
    logger.fatal(error);
    return res.status(500).json('Internal Server error');
  }
};
