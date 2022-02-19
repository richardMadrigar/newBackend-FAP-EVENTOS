import { logger } from '../../../../config/configLogger';
import { createUser, FindByCPF } from '../../repositories/implementations/UserRepository';
import { ICreateUserDTO } from '../../DTO/ICreateUserDTO';

export const createUserUseCase = async ({
  nome_completo,
  email,
  cpf,
  senha,
  rg,
  whats,
  celular,
  data_nascimento,
  nit_pis,
  nome_da_mae,
  banco,
  ccm,
  cep,
  pix,
  agencia,
  conta,
  check_doc,
  numero_da_rua,
  permissao,
  funcao,
}: ICreateUserDTO) => {
  try {
    if (cpf.length !== 11) throw new Error('CPF deve conter 11 digitos');

    const userAlreadyExists = await FindByCPF(cpf);

    if (userAlreadyExists > 0) {
      logger.info(`Usuario com CPF: ${cpf} ja existe`);
      throw new Error(`Usuário com CPF: ${cpf} já existe`);
    }

    const CreateUserSuccess = await createUser({
      nome_completo,
      email,
      whats,
      celular,
      pix,
      data_nascimento,
      nit_pis,
      nome_da_mae,
      banco,
      cep,
      funcao,
      numero_da_rua,
      cpf,
      rg,
      check_doc,
      senha,
      agencia,
      conta,
      permissao,
      ccm,
    });

    return (CreateUserSuccess);
  } catch (error) {
    logger.fatal(error);
    throw new Error('Internal Server error');
  }
};
