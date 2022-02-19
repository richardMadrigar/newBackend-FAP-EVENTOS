import { Request, Response } from 'express';
import { createUserUseCase } from './CreateUserUseCase';

const CreateUserController = async (request: Request, response: Response) => {
  const {
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
  } = request.body;

  const user = await createUserUseCase(
    {
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
    },
  );
  return response.status(201).json(user);
};

export { CreateUserController };
