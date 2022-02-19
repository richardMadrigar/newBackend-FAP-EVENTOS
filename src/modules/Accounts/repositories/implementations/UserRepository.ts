import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { pool } from '../../../../config/configDataBase/database';
import { logger } from '../../../../config/configLogger';
import { generateToken } from '../../../../config/configToken/generateToken';
import { ICreateUserDTO } from '../../DTO/ICreateUserDTO';

const salt = bcrypt.genSaltSync(10);

export const FindByCPF = async (cpf: string) => {
  const { rowCount } = await pool.query('SELECT cpf FROM usuarios WHERE cpf = $1', [cpf]);
  return rowCount;
};

export const createUser = async ({
  nome_completo, email, cpf, senha, rg, whats, celular, data_nascimento, nit_pis,
  nome_da_mae, banco, cep, pix, agencia, conta, check_doc, numero_da_rua, ccm, funcao, permissao,
}: ICreateUserDTO) => {
  const hash = bcrypt.hashSync(senha, salt);

  const id_usuario = uuidv4();

  const SQL = `INSERT INTO usuarios (
    id_usuario, nome_completo, email, cpf, senha, rg, whats, celular, data_nascimento, nit_pis,
    nome_da_mae, banco, cep , pix, agencia, conta , check_doc, numero_da_rua, ccm, funcao
  )
    VALUES( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20 )
  `;

  const values = [
    id_usuario, nome_completo, email, cpf, hash, rg, whats, celular, data_nascimento, nit_pis,
    nome_da_mae, banco, cep, pix, agencia, conta, check_doc, numero_da_rua, ccm, funcao,
  ];

  const SQL_permissao = 'INSERT INTO permissao_usuario ( id_usuario, permissao, nome_completo, cpf_usuario ) VALUES( $1, $2, $3, $4 )';
  const values_permissao = [id_usuario, permissao, nome_completo, cpf];

  const SQL_img = 'INSERT INTO img_perfil_usuarios ( id_usuario ) VALUES( $1 )';
  const values_img = [id_usuario];

  await pool.query(SQL, values);
  await pool.query(SQL_img, values_img);
  await pool.query(SQL_permissao, values_permissao);

  const { rows } = await pool.query(`
      SELECT * FROM usuarios
      INNER JOIN img_perfil_usuarios
      ON usuarios.id_usuario=img_perfil_usuarios.id_usuario
      INNER JOIN permissao_usuarios
      ON usuarios.id_usuario=permissao_usuarios.id_usuario
      WHERE cpf = $1`, [cpf]);

  const [{ img_perfil }] = rows;

  const token = generateToken(cpf);
  logger.info(`Usuario criado { Nome: ${nome_completo} } { CPF: ${cpf} } `);

  return {
    message: 'usuario criado',
    id_usuario,
    nome_completo,
    email,
    cpf,
    rg,
    whats,
    celular,
    data_nascimento,
    nit_pis,
    funcao,
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
    token,
  };
};
